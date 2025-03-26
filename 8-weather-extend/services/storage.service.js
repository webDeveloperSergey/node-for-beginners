import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
  token: 'token',
  cities: 'cities',
  lang: 'language',
  defaultLang: 'ru',
}

const saveKeyValue = async (key, value) => {
  let data = {}

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file)
  }

  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file)
    return data[key]
  }

  return undefined
}

const delKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file)

    if (!data[key])
      throw new Error('Такого параметра не существует для удаления')

    delete data[key]

    await promises.writeFile(filePath, JSON.stringify(data))
  }

  return undefined
}

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}

export { saveKeyValue, getKeyValue, delKeyValue, TOKEN_DICTIONARY }
