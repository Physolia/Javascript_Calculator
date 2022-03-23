let operandFirst = ''
let operandSecond = ''
let operationCurrent = null
let shouldScreenRest = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsButton')
const clearButton = document.getElementById('clearButton')
const deleteButton = document.getElementById('deleteButton')
const pointButton = document.getElementById('pointButton')
const lastScreenOperation = document.getElementById('lastScreenOperation')
const currentScreenOperation = document.getElementById('currentScreenOperation')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentScreenOperation.textContent === '0' || shouldScreenRest)
    resetScreen()
  currentScreenOperation.textContent += number
}

function resetScreen() {
  currentScreenOperation.textContent = ''
  shouldScreenRest = false
}

function clear() {
  currentScreenOperation.textContent = '0'
  lastScreenOperation.textContent = ''
  operandFirst = ''
  operandSecond = ''
  operationCurrent = null
}

function appendPoint() {
  if (shouldScreenRest) resetScreen()
  if (currentScreenOperation.textContent === '')
    currentScreenOperation.textContent = '0'
  if (currentScreenOperation.textContent.includes('.')) return
  currentScreenOperation.textContent += '.'
}

function deleteNumber() {
  currentScreenOperation.textContent = currentScreenOperation.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (operationCurrent !== null) evaluate()
  operandFirst = currentScreenOperation.textContent
  operationCurrent = operator
  lastScreenOperation.textContent = `${operandFirst} ${operationCurrent}`
  shouldScreenRest = true
}

function evaluate() {
  if (operationCurrent === null || shouldScreenRest) return
  if (operationCurrent === '÷' && currentScreenOperation.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  operandSecond = currentScreenOperation.textContent
  currentScreenOperation.textContent = roundResult(
    operate(operationCurrent, operandFirst, operandSecond)
  )
  lastScreenOperation.textContent = `${operandFirst} ${operationCurrent} ${operandSecond} =`
  operationCurrent = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}