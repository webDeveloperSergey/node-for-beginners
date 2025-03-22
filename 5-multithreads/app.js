const { PerformanceObserver, performance } = require('perf_hooks')
const { Worker } = require('worker_threads')
const createArray = require('./createArray')
const generateArrayChunks = require('./generateArrayChunks')

process.env.UV_THREADPOOL_SIZE = 8

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(`${item.entryType} ${item.name}: ${item.duration}`)
  })
})

obs.observe({ entryTypes: ['measure'] })

const linear = (arr) => {
  performance.mark('linear start')

  const filteredArr = arr.filter((item) => item % 3 === 0)

  performance.mark('linear end')
  performance.measure('linear', 'linear start', 'linear end')

  return filteredArr.length
}

const workerFunc = (arr) => {
  return new Promise((resolve, reject) => {
    performance.mark('worker start')

    const chunks = generateArrayChunks(arr, 8)

    const workers = chunks.map((chunk) => {
      return new Promise((resolveWorker, rejectWorker) => {
        const worker = new Worker('./worker.js', {
          workerData: { chunk },
        })

        worker.on('message', (msg) => resolveWorker(msg))
        worker.on('error', (msg) => rejectWorker(msg))
        worker.on('exit', (code) => {
          if (code !== 0)
            rejectWorker(new Error(`Worker stopped with exit code ${code}`))
        })
      })
    })

    Promise.all(workers).then((results) => {
      performance.mark('worker end')
      performance.measure('worker', 'worker start', 'worker end')
      resolve(results.reduce((acc, count) => acc + count, 0))
    })
  })
}

const main = async () => {
  const arr = createArray(300000)

  const linearResult = linear(arr)
  console.log(`Linear result: ${linearResult}`)

  const workerResult = await workerFunc(arr)
  console.log(`Worker result: ${workerResult}`)
}

main()
