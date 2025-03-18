const EventEmitter = require('events')
const myEmitter = new EventEmitter()

const [firstNum, secondNum, operation] = process.argv.slice(2)

myEmitter.addListener('add', (firstOperand, secondOperand) =>
  myEmitter.emit('result', Number(firstOperand) + Number(secondOperand))
)

myEmitter.addListener('multiply', (firstOperand, secondOperand) =>
  myEmitter.emit('result', firstOperand * secondOperand)
)

myEmitter.addListener('result', (result) => console.log(result))

myEmitter.addListener('error', (error) =>
  console.log(`Error: ${error.message}`)
)

if (operation && myEmitter.listenerCount(operation) > 0) {
  myEmitter.emit(operation, firstNum, secondNum)
} else {
  myEmitter.emit(
    'error',
    new Error(
      operation
        ? `Operation "${operation}" not supported`
        : 'The operation is not specified'
    )
  )
}

myEmitter.removeAllListeners('add', 'multiply', 'result', 'error')
