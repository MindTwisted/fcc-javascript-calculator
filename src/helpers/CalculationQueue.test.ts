import CalculationQueue from './CalculationQueue'

test('it should be able to create empty queue', () => {
  const calculationQueue = new CalculationQueue()

  expect(calculationQueue.getQueueAsArray()).toEqual([])
})

test('it should be able to create queue with initial expression', () => {
  const expression = ['22', '+', '33', '-', '44']
  const calculationQueue = new CalculationQueue(expression)

  expect(calculationQueue.getQueueAsArray()).toEqual(expression)
})

test('it should be able to get the last item of the queue', () => {
  const expression = ['22', '+', '33', '-', '44']
  const calculationQueue = new CalculationQueue(expression)

  expect(calculationQueue.getLastItem()).toBe(expression[expression.length - 1])
})

test('it should be able to append item to the queue', () => {
  const expression = ['22', '+', '33', '-', '44']
  const calculationQueue = new CalculationQueue(expression)
  const appendItem = '/'

  expect(calculationQueue.appendToQueue(appendItem).getQueueAsArray()).toEqual([...expression, appendItem])
})

test('it should be able to remove operator from the end of the queue', () => {
  const expression = ['22', '+', '33', '-', '44', '/']
  const calculationQueue = new CalculationQueue(expression)

  expect(calculationQueue.removeOperatorFromTheEndOfTheQueue().getQueueAsArray())
    .toEqual(expression.slice(0, expression.length - 1))
})

test('it should be able to call removeOperatorFromTheEndOfTheQueue on the queue without operator at the end', () => {
  const expression = ['22', '+', '33', '-', '44']
  const calculationQueue = new CalculationQueue(expression)

  expect(calculationQueue.removeOperatorFromTheEndOfTheQueue().getQueueAsArray())
    .toEqual(expression)
})

test('it should be able to check if queue is finished', () => {
  const notFinishedQueue = new CalculationQueue(['22', '+', '33', '-', '44'])
  const finishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '11'])

  expect(notFinishedQueue.isFinished()).toBeFalsy()
  expect(finishedQueue.isFinished()).toBeTruthy()
})

test('it should be able to check if queue ends with operator', () => {
  const endsWithOperatorQueue = new CalculationQueue(['22', '+', '33', '-'])
  const endsWithNumberQueue = new CalculationQueue(['22', '+', '33', '-', '44'])

  expect(endsWithOperatorQueue.isEndsWithOperator()).toBeTruthy()
  expect(endsWithNumberQueue.isEndsWithOperator()).toBeFalsy()
})

test('it should be able to check if queue ends with number', () => {
  const endsWithOperatorQueue = new CalculationQueue(['22', '+', '33', '-'])
  const endsWithNumberQueue = new CalculationQueue(['22', '+', '33', '-', '44'])

  expect(endsWithOperatorQueue.isEndsWithNumber()).toBeFalsy()
  expect(endsWithNumberQueue.isEndsWithNumber()).toBeTruthy()
})

test('it should be able to check if queue is empty', () => {
  const emptyQueue = new CalculationQueue()
  const notEmptyQueue = new CalculationQueue(['22', '+', '33', '-', '44'])

  expect(emptyQueue.isEmpty()).toBeTruthy()
  expect(notEmptyQueue.isEmpty()).toBeFalsy()
})

test('it should be able to check if queue is valid for calculation', () => {
  const invalidQueue = new CalculationQueue(['22', '33', '+', '22'])
  const finishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '11'])
  const validQueue = new CalculationQueue(['22', '+', '33', '-', '44'])

  expect(invalidQueue.isValidForCalculation()).toBeFalsy()
  expect(finishedQueue.isValidForCalculation()).toBeFalsy()
  expect(validQueue.isValidForCalculation()).toBeTruthy()
})

test('it should be able to check if queue is properly calculated', () => {
  const invalidNotFinishedQueue = new CalculationQueue(['22', '33', '+', '22'])
  const invalidFinishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '+', '33'])
  const validFinishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '11'])

  expect(invalidNotFinishedQueue.isProperlyCalculated()).toBeFalsy()
  expect(invalidFinishedQueue.isProperlyCalculated()).toBeFalsy()
  expect(validFinishedQueue.isProperlyCalculated()).toBeTruthy()
})

test('it should be able to get calculation result from the properly calculated queue', () => {
  const invalidFinishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '+', '33'])
  const validFinishedQueue = new CalculationQueue(['22', '+', '33', '-', '44', '=', '11'])

  expect(() => invalidFinishedQueue.getCalculationResult())
    .toThrowError('Can\'t get calculation result from the queue that wasn\'t properly calculated')
  expect(validFinishedQueue.getCalculationResult()).toBe('11')
})
