import chalk from 'node-chalk'
import dedent from 'dedent-js'

const icons = {
  1: '☀️',
  2: '🌤️',
  3: '☁️',
  4: '☁️',
  9: '🌧️',
  10: '🌦️',
  11: '🌩️',
  13: '❄️',
  50: '🌫️',
}

const getIcon = (icon) => {
  return icons[icon.slice(0, -1).replace(/^0+/, '')]
}

const printError = (error) => {
  console.log(`${chalk.bgRed('ERROR')}: ${error}`)
}

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen('SUCCESS')}: ${message}`)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan('HELP')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `
  )
}

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${getIcon(icon)}  ${res.weather[0].description}
		Температура: ${res.main.temp} °C (ощущается как ${res.main.feels_like} °C)
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
  )
}

export { printError, printSuccess, printHelp, printWeather }
