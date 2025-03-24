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
  getKeyValue,
  saveKeyValue,
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

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранен')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
    const weather = await getWeather(city)
    printWeather(weather, weather.weather[0].icon)
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

  const { h, s, t } = args

  if (h) {
    return printHelp()
  }

  if (s) {
    return saveCity(s)
  }

  if (t) {
    return saveToken(t)
  }

  getForecast()
}
initCLI()
