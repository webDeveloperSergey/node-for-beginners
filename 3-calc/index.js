const firstNum = process.argv[2]
const secondNum = process.argv[3]
const inputOperation = process.argv[4]

try {
  const currentOperation = require(`./${inputOperation}`)
  console.log(currentOperation(firstNum, secondNum))
} catch (error) {
  throw new Error(
    `There is no such operation, check the modules. ${error.message}`
  )
}
