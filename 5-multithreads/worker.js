const { parentPort, workerData } = require('worker_threads')

const countDivisibleByThree = ({ chunk }) => {
  return chunk.filter((item) => item % 3 === 0).length
}

parentPort.postMessage(countDivisibleByThree(workerData))
