import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
  const language =
    process.env.LANGUAGE ??
    (await getKeyValue(TOKEN_DICTIONARY.lang)) ??
    TOKEN_DICTIONARY.defaultLang

  if (!token) {
    throw new Error('Не задан ключ API. Задайте его через команду -t [API_KEY]')
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: language,
        units: 'metric',
      },
    }
  )

  return data
}

export { getWeather }
