#!/usr/bin/env node

import { getArgs } from './helpers/getArgs.js'
import { getWeather } from './services/api.service.js'
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js'
import {
  delKeyValue,
  saveKeyValue,
  getKeyValue,
  TOKEN_DICTIONARY,
} from './services/storage.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch (e) {
    printError(e.message)
  }
}

const saveCities = async (cities) => {
  if (!cities.length) {
    printError('Не передан город')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.cities, cities)
    printSuccess('Город сохранен')
  } catch (e) {
    printError(e.message)
  }
}

const saveLanguage = async (language) => {
  if (!language.length) {
    printError('Не передан язык')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.lang, language)
    printSuccess('Язык сохранен')
  } catch (e) {
    printError(e.message)
  }
}

const delKey = async (key) => {
  if (!key.length) {
    printError('Не передан ключ для удаления')
    return
  }

  try {
    await delKeyValue(key)
    printSuccess(`Параметр ${key} удален`)
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weathers = await getWeather()
    weathers.forEach((weather) =>
      printWeather(weather, weather.weather[0].icon)
    )
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город')
    } else if (e?.response?.status === 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  const { h: help, s: cities, t: token, l: language, d: del } = args

  if (help) printHelp()

  if (cities) saveCities(cities)

  if (token) saveToken(token)

  if (language) saveLanguage(language)

  if (del) delKey(del)

  getForecast()
}
initCLI()
