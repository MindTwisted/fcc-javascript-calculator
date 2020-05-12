import { useState } from 'react'
import CalculatorInputManager from '../helpers/CalculatorInputManager'
import CalculationQueue from '../helpers/CalculationQueue'

export interface CalculatorState {
  calculationsQueue: CalculationQueue
  currentInput: string
}

const initialCalculatorState: CalculatorState = {
  calculationsQueue: new CalculationQueue(),
  currentInput: ''
}

export default function useCalculatorState (initialState: CalculatorState | null = null) {
  const [state, setState] = useState<CalculatorState>(initialState || initialCalculatorState)
  const processInput = (value: string) => {
    setState(CalculatorInputManager.processInput(value, state))
  }
  const resetCalculator = () => {
    setState(initialCalculatorState)
  }

  return {
    state,
    processInput,
    resetCalculator
  }
}
