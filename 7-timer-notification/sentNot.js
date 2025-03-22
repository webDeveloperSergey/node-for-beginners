const notifier = require('node-notifier')

const sentNot = (type, timeArr = []) => {
  const finishedTimerNot = {
    title: 'Timer end',
    message: `Your timer with parameters ${timeArr.join(
      ' '
    )} has finished working`,
    sound: true,
  }

  const incorrectTimerFormat = {
    title: 'Incorrect format',
    message:
      'You entered the wrong format. you need to follow this format "0h 0m 0s"',
    sound: true,
  }

  const notificationTypes = {
    end: finishedTimerNot,
    incorrect: incorrectTimerFormat,
  }

  return notifier.notify(notificationTypes[type])
}

module.exports = sentNot
