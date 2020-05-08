import { CalculatorState } from '../hooks/useCalculatorState'
import {
  appendToString,
  isDot,
  isEmptyString,
  isEqualOperator,
  isNumber,
  isOperator,
  isStringEndsWithNumber, isStringEndsWithOperator,
  isStringOfNumbers,
  isStringOfNumbersEndsWithDot,
  isStringOfNumbersWithDotInTheMiddle, isStringWithEqualOperator,
  isZero
} from './utils'

export interface CalculatorProcessor {
    isApply: (value: string, state: CalculatorState) => boolean
    process: (value: string, state: CalculatorState) => CalculatorState
}

const calculatorProcessors: CalculatorProcessor[] = [
  {
    isApply (value, state) {
      return isNumber(value) &&
          isEmptyString(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: appendToString(value, state.currentInput)
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          !isZero(value) &&
           isZero(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return state
    }
  },
  {
    isApply (value, state) {
      return isZero(value) &&
           isZero(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return state
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbers(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: appendToString(value, state.currentInput)
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbersEndsWithDot(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: appendToString(value, state.currentInput)
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbersWithDotInTheMiddle(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: appendToString(value, state.currentInput)
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isOperator(state.currentInput) &&
          !isEqualOperator(state.currentInput) &&
          !isStringWithEqualOperator(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: appendToString(state.currentInput, state.calculationsQueue, true),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isDot(value) &&
          isStringOfNumbers(state.currentInput)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: appendToString(value, state.currentInput)
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          isOperator(state.currentInput) &&
          isStringEndsWithNumber(state.calculationsQueue)
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue,
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          !isStringWithEqualOperator(state.calculationsQueue) &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value, state) {
      return {
        calculationsQueue: appendToString(state.currentInput, state.calculationsQueue, true),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          isEmptyString(state.calculationsQueue) &&
          isEmptyString(state.currentInput)
    },
    process (value) {
      return {
        calculationsQueue: '0',
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          isStringWithEqualOperator(state.calculationsQueue) &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value, state) {
      return {
        calculationsQueue: state.currentInput,
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringWithEqualOperator(state.calculationsQueue) &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value) {
      return {
        calculationsQueue: '',
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isEqualOperator(value) &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          ) &&
          isStringEndsWithOperator(state.calculationsQueue)
    },
    process (value, state) {
      const calculationsQueue = appendToString(state.currentInput, state.calculationsQueue, true)
      // eslint-disable-next-line no-eval
      const calculationResult = String(eval(calculationsQueue))

      return {
        calculationsQueue: `${calculationsQueue} = ${calculationResult}`,
        currentInput: calculationResult
      }
    }
  },
  {
    isApply (value, state) {
      return isEqualOperator(value) &&
          isOperator(state.currentInput) &&
          isStringEndsWithNumber(state.calculationsQueue)
    },
    process (value, state) {
      // eslint-disable-next-line no-eval
      const calculationResult = String(eval(state.calculationsQueue))

      return {
        calculationsQueue: `${state.calculationsQueue} = ${calculationResult}`,
        currentInput: calculationResult
      }
    }
  },
  {
    isApply (value, state) {
      return isEqualOperator(value) &&
          isStringOfNumbers(state.currentInput) &&
          isEmptyString(state.calculationsQueue)
    },
    process (value, state) {
      // eslint-disable-next-line no-eval
      const calculationResult = String(eval(state.currentInput))

      return {
        calculationsQueue: `${state.currentInput} = ${calculationResult}`,
        currentInput: calculationResult
      }
    }
  }
]

export default calculatorProcessors
