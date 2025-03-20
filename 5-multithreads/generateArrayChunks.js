// @desc arr - source array; n - number of cores
const generateArrayChunks = (arr, n) => {
  const chunkSize = Math.ceil(arr.length / n)
  const chunks = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }

  return chunks
}

module.exports = generateArrayChunks
