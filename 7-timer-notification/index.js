const sentNot = require('./sentNot')

const timeArr = process.argv.slice(2)

const getFullTimeSeconds = () => {
  let fullTimeSeconds = 0
  const convertTimeMap = {
    h: 3600,
    m: 60,
    s: 1,
  }

  timeArr.forEach((time) => {
    const timeChar = time[time.length - 1]
    const timerCount = time.match(/\d+/g)[0]

    fullTimeSeconds += Number(timerCount) * convertTimeMap[timeChar]
  })

  return fullTimeSeconds
}

const timerId = setTimeout(() => {
  console.log('Shutdown timer')

  sentNot('end', timeArr)
}, getFullTimeSeconds() * 1000)

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
