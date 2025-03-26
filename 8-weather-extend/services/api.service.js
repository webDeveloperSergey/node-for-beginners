import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  const cities = await getKeyValue(TOKEN_DICTIONARY.cities)
  const language =
    process.env.LANGUAGE ??
    (await getKeyValue(TOKEN_DICTIONARY.lang)) ??
    TOKEN_DICTIONARY.defaultLang

  if (!token) {
    throw new Error('Не задан ключ API. Задайте его через команду -t [API_KEY]')
  }

  const weatherPromise = cities.map((city) =>
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: language,
        units: 'metric',
      },
    })
  )

  const responses = await Promise.all(weatherPromise)
  return responses.map((res) => res.data)
}

export { getWeather }
