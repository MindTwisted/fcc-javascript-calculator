import CalculationQueue from './CalculationQueue'

const availableNumberOfDecimalPlaces = 4

const CalculationEngine = {
  calculateQueue (calculationQueue: CalculationQueue): number {
    // eslint-disable-next-line no-eval
    return eval(calculationQueue.getQueueAsArray().join(' '))
  },
  formatOutput (result: number): string {
    if (this.getTheNumberOfDecimalPlaces(result) > availableNumberOfDecimalPlaces) {
      return result.toFixed(availableNumberOfDecimalPlaces)
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
