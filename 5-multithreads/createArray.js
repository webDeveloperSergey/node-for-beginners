const createArray = (size) => {
  const arr = []

  for (let i = 0; i < size; i++) {
    arr.push(i)
  }

  return arr
}

module.exports = createArray
