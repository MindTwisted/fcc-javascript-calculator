const availableNumberOfDecimalPlaces = 4

const CalculationEngine = {
  processCalculation (expression: string): string {
    // eslint-disable-next-line no-eval
    const calculationResult = eval(expression)

    if (this.getTheNumberOfDecimalPlaces(calculationResult) > availableNumberOfDecimalPlaces) {
      return calculationResult.toFixed(availableNumberOfDecimalPlaces)
    }

    return String(calculationResult)
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
