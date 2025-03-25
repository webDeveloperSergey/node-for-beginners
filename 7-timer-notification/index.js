const sentNot = require('./common/sentNot')
const getFullTimeSeconds = require('./common/getFullTimeSeconds')

const main = () => {
  const timeArr = process.argv.slice(2)

  const timerId = setTimeout(() => {
    console.log('Shutdown timer')

    sentNot('end', timeArr)
  }, getFullTimeSeconds(timeArr) * 1000)

  if (timeArr.length > 0) {
    setImmediate(() => {
      console.log(`The timer has started and is set to ${timeArr.join(' ')}`)
    })
  }

  if (timeArr.length === 0) {
    clearTimeout(timerId)
    console.log('Set the timer to format: 0h 0m 0s')

    sentNot('incorrect')
  }
}

main()
