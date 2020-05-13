import CalculationQueue from './CalculationQueue'
import { isDivisionOperator, isMinusOperator, isMultiplyOperator, isPlusOperator } from './utils'

const getTheNumberOfDecimalPlaces = (number: number): number => {
  const numbersAfterDecimal = String(number).match(/^[0-9]+\.([0-9]+)$/)

  if (numbersAfterDecimal && numbersAfterDecimal[1]) {
    return numbersAfterDecimal[1].length
  }

  return 0
}

const processMultiplyAndDivision = (calculationArray: string[]): string[] => {
  calculationArray = [...calculationArray]

  while (calculationArray.includes('*') || calculationArray.includes('/')) {
    for (let i = 1; i < calculationArray.length; i += 2) {
      const current = calculationArray[i]
      const isMultiplyOperation = isMultiplyOperator(current)
      const isDivisionOperation = isDivisionOperator(current)

      if (isMultiplyOperation || isDivisionOperation) {
        const firstOperand = Number(calculationArray[i - 1])
        const secondOperand = Number(calculationArray[i + 1])
        const result = isMultiplyOperation ? firstOperand * secondOperand : firstOperand / secondOperand

        calculationArray.splice(i - 1, 3, String(result))

        break
      }
    }
  }

  return calculationArray
}

const processPlusAndMinus = (calculationArray: string[]): string[] => {
  calculationArray = [...calculationArray]

  while (calculationArray.includes('+') || calculationArray.includes('-')) {
    for (let i = 1; i < calculationArray.length; i += 2) {
      const current = calculationArray[i]
      const isAddOperation = isPlusOperator(current)
      const isSubtractionOperation = isMinusOperator(current)

      if (isAddOperation || isSubtractionOperation) {
        const firstOperand = Number(calculationArray[i - 1])
        const secondOperand = Number(calculationArray[i + 1])
        const result = isAddOperation ? firstOperand + secondOperand : firstOperand - secondOperand

        calculationArray.splice(i - 1, 3, String(result))

        break
      }
    }
  }

  return calculationArray
}

const CalculationEngine = {
  calculateQueue (calculationQueue: CalculationQueue): number {
    if (!calculationQueue.isValidForCalculation()) {
      throw Error('Invalid calculation queue has been provided')
    }

    const calculationArray = calculationQueue.getQueueAsArray()
    const arrayWithMultiplyAndDivisionProcessed = processMultiplyAndDivision(calculationArray)
    const arrayWithPlusAndMinusProcessed = processPlusAndMinus(arrayWithMultiplyAndDivisionProcessed)

    return Number(arrayWithPlusAndMinusProcessed[0])
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
