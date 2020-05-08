import { CalculatorState } from '../hooks/useCalculatorState'
import calculatorProcessors, { CalculatorProcessor } from './calculatorProcessors'

const CalculatorInputManager: {
  processors: CalculatorProcessor[]
  processInput: (value: string, state: CalculatorState) => CalculatorState
} = {
  processors: calculatorProcessors,
  processInput (value: string, state: CalculatorState): CalculatorState {
    for (let i = 0; i < this.processors.length; i++) {
      const currentProcessor = this.processors[i]

      if (currentProcessor.isApply(value, state)) {
        return currentProcessor.process(value, state)
      }
    }

    return state
  }
}

export default CalculatorInputManager
