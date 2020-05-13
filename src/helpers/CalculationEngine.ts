import CalculationQueue from './CalculationQueue'

const CalculationEngine = {
  calculateQueue (calculationQueue: CalculationQueue): number {
    // eslint-disable-next-line no-eval
    return eval(calculationQueue.getQueueAsArray().join(' '))
  },
  formatOutput (result: number, numberOfDecimalPlaces = 4): string {
    if (this.getTheNumberOfDecimalPlaces(result) > numberOfDecimalPlaces) {
      return result.toFixed(numberOfDecimalPlaces)
    }

    return String(result)
  },
  processCalculation (calculationQueue: CalculationQueue): string {
    return this.formatOutput(this.calculateQueue(calculationQueue))
  },
  getTheNumberOfDecimalPlaces (number: number): number {
    const numbersAfterDecimal = String(number).match(/^[0-9]+\.([0-9]+)$/)

    if (numbersAfterDecimal && numbersAfterDecimal[1]) {
      return numbersAfterDecimal[1].length
    }

    return 0
  }
}

export default CalculationEngine
