const [firstNum, secondNum, inputOperation] = process.argv.slice(2)

try {
  const currentOperation = require(`./${inputOperation}`)
  console.log(currentOperation(firstNum, secondNum))
} catch (error) {
  throw new Error(
    `There is no such operation, check the modules. ${error.message}`
  )
}
