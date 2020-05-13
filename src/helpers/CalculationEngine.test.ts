import CalculationQueue from './CalculationQueue'
import CalculationEngine from './CalculationEngine'

test('it should be able to calculate a valid queue', () => {
  const testCases = [
    ['22', '+', '55', '-', '33'],
    ['55', '*', '-22', '-', '9999'],
    ['9888', '/', '-66', '*', '0.38']
  ]

  testCases.forEach(testCase => {
    const calculationQueue = new CalculationQueue(testCase)
    // eslint-disable-next-line no-eval
    const calculationsResult = eval(calculationQueue.getQueueAsArray().join(''))

    expect(CalculationEngine.calculateQueue(calculationQueue)).toBe(calculationsResult)
  })
})

test('it should not be able to calculate an invalid queue', () => {
  const testCases = [
    ['22', '+', '55', '33'],
    ['55', '*', '-22', '=', '9999'],
    ['9888', '/', '-66', '*', '0.38', '=']
  ]

  testCases.forEach(testCase => {
    const calculationQueue = new CalculationQueue(testCase)

    expect(() => CalculationEngine.calculateQueue(calculationQueue))
      .toThrowError('Invalid calculation queue has been provided')
  })
})

test('it should be able to format output', () => {
  const testCases = [
    {
      input: 22,
      output: '22',
      numberOfDecimalPlaces: 3
    },
    {
      input: 22.22,
      output: '22.22',
      numberOfDecimalPlaces: 3
    },
    {
      input: 22.22222222222222222222222,
      output: '22.2222',
      numberOfDecimalPlaces: 4
    },
    {
      input: 22.8792424,
      output: '22.88',
      numberOfDecimalPlaces: 2
    }
  ]

  testCases.forEach(testCase => {
    expect(CalculationEngine.formatOutput(testCase.input, testCase.numberOfDecimalPlaces)).toBe(testCase.output)
  })
})

test('it should be able to process calculation on a valid queue', () => {
  const testCases = [
    ['22', '+', '55', '-', '33'],
    ['55', '*', '-22', '-', '9999'],
    ['9888', '/', '-66', '*', '0.38']
  ]

  testCases.forEach(testCase => {
    const calculationQueue = new CalculationQueue(testCase)
    // eslint-disable-next-line no-eval
    const calculationsResult = eval(calculationQueue.getQueueAsArray().join(''))
    const resultQueue = CalculationEngine.processCalculation(calculationQueue)

    expect(resultQueue.getQueueAsArray())
      .toEqual([...testCase, '=', String(calculationsResult)])
  })
})

test('it should not be able to process calculation on an invalid queue', () => {
  const testCases = [
    ['22', '+', '55', '33'],
    ['55', '*', '-22', '=', '9999'],
    ['9888', '/', '-66', '*', '0.38', '=']
  ]

  testCases.forEach(testCase => {
    const calculationQueue = new CalculationQueue(testCase)

    expect(() => CalculationEngine.processCalculation(calculationQueue))
      .toThrowError('Invalid calculation queue has been provided')
  })
})
