import CalculationQueue from './CalculationQueue'

const getTheNumberOfDecimalPlaces = (number: number): number => {
  const numbersAfterDecimal = String(number).match(/^[0-9]+\.([0-9]+)$/)

  if (numbersAfterDecimal && numbersAfterDecimal[1]) {
    return numbersAfterDecimal[1].length
  }

  return 0
}

const CalculationEngine = {
  calculateQueue (calculationQueue: CalculationQueue): number {
    if (!calculationQueue.isValidForCalculation()) {
      throw Error('Invalid calculation queue has been provided')
    }

    // eslint-disable-next-line no-eval
    return eval(calculationQueue.getQueueAsArray().join(' '))
  },
  formatOutput (result: number, numberOfDecimalPlaces = 4): string {
    if (getTheNumberOfDecimalPlaces(result) > numberOfDecimalPlaces) {
      return result.toFixed(numberOfDecimalPlaces)
    }

    return String(result)
  },
  processCalculation (calculationQueue: CalculationQueue, numberOfDecimalPlaces = 4): CalculationQueue {
    const calculationResult = this.formatOutput(this.calculateQueue(calculationQueue), numberOfDecimalPlaces)

    return calculationQueue.appendToQueue('=')
      .appendToQueue(calculationResult)
  }
}

export default CalculationEngine
