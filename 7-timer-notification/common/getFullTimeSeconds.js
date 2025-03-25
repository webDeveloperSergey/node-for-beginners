const getFullTimeSeconds = (arr) => {
  let fullTimeSeconds = 0
  const convertTimeMap = {
    h: 3600,
    m: 60,
    s: 1,
  }

  arr.forEach((time) => {
    const timeChar = time[time.length - 1]
    const timerCount = time.match(/\d+/g)[0]

    fullTimeSeconds += Number(timerCount) * convertTimeMap[timeChar]
  })

  return fullTimeSeconds
}

module.exports = getFullTimeSeconds
