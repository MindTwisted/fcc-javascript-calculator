import { CalculatorState } from '../hooks/useCalculatorState'
import {
  isDot,
  isEmptyString,
  isEqualOperator,
  isMinusOperator,
  isNumber,
  isOperator,
  isStringOfNumbers,
  isStringOfNumbersEndsWithDot,
  isStringOfNumbersWithDotInTheMiddle,
  isZero
} from './utils'
import CalculationEngine from './CalculationEngine'
import CalculationQueue from './CalculationQueue'

export interface CalculatorProcessor {
    isApply: (value: string, state: CalculatorState) => boolean
    process: (value: string, state: CalculatorState) => CalculatorState
}

const calculatorProcessors: CalculatorProcessor[] = [
  {
    isApply (value, state) {
      return state.currentInput.length >= 15 &&
          !state.calculationsQueue.isFinished() &&
          (
            isNumber(value) ||
            isDot(value)
          )
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: state.currentInput
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isEmptyString(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `${state.currentInput}${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          !isZero(value) &&
           isZero(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: state.currentInput
      }
    }
  },
  {
    isApply (value, state) {
      return isZero(value) &&
           isZero(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: state.currentInput
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbers(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `${state.currentInput}${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbersEndsWithDot(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `${state.currentInput}${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isStringOfNumbersWithDotInTheMiddle(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `${state.currentInput}${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isMinusOperator(state.currentInput) &&
          state.calculationsQueue.isEndsWithOperator() &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `-${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          isOperator(state.currentInput) &&
          !isEqualOperator(state.currentInput) &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue.appendToQueue(state.currentInput),
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
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: `${state.currentInput}${value}`
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          isMinusOperator(state.currentInput) &&
          state.calculationsQueue.isEndsWithOperator() &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue.removeOperatorFromTheEndOfTheQueue(),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isMinusOperator(value) &&
          isOperator(state.currentInput) &&
          state.calculationsQueue.isEndsWithNumber() &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue.appendToQueue(state.currentInput),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isMinusOperator(value) &&
          !isEqualOperator(value) &&
          isOperator(state.currentInput) &&
          state.calculationsQueue.isEndsWithNumber() &&
          !state.calculationsQueue.isFinished()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          !state.calculationsQueue.isFinished() &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue.appendToQueue(state.currentInput),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          state.calculationsQueue.isEmpty() &&
          isEmptyString(state.currentInput)
    },
    process (value) {
      return {
        calculationsQueue: new CalculationQueue(['0']),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isOperator(value) &&
          !isEqualOperator(value) &&
          state.calculationsQueue.isFinished() &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue([state.currentInput]),
        currentInput: value
      }
    }
  },
  {
    isApply (value, state) {
      return isNumber(value) &&
          state.calculationsQueue.isFinished() &&
          (
            isStringOfNumbers(state.currentInput) ||
            isStringOfNumbersWithDotInTheMiddle(state.currentInput)
          )
    },
    process (value) {
      return {
        calculationsQueue: new CalculationQueue(),
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
          state.calculationsQueue.isEndsWithOperator()
    },
    process (value, state) {
      const calculationsQueue = state.calculationsQueue.appendToQueue(state.currentInput)
      const resultQueue = CalculationEngine.processCalculation(calculationsQueue)
      const resultInput = resultQueue.getCalculationResult()

      return {
        calculationsQueue: resultQueue,
        currentInput: resultInput
      }
    }
  },
  {
    isApply (value, state) {
      return isEqualOperator(value) &&
          isOperator(state.currentInput) &&
          state.calculationsQueue.isEndsWithNumber()
    },
    process (value, state) {
      const resultQueue = CalculationEngine.processCalculation(state.calculationsQueue)
      const resultInput = resultQueue.getCalculationResult()

      return {
        calculationsQueue: resultQueue,
        currentInput: resultInput
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
          state.calculationsQueue.isEmpty()
    },
    process (value, state) {
      return {
        calculationsQueue: state.calculationsQueue
          .appendToQueue(state.currentInput)
          .appendToQueue('=')
          .appendToQueue(state.currentInput),
        currentInput: state.currentInput
      }
    }
  },
  {
    isApply (value, state) {
      return isEqualOperator(value) &&
          isEmptyString(state.currentInput) &&
          state.calculationsQueue.isEmpty()
    },
    process (value, state) {
      return {
        calculationsQueue: new CalculationQueue(state.calculationsQueue.getQueueAsArray()),
        currentInput: state.currentInput
      }
    }
  }
]

export default calculatorProcessors
