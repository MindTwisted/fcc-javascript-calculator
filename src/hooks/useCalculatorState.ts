import { useState } from 'react'
import CalculatorInputManager from '../helpers/CalculatorInputManager'

export interface CalculatorState {
  calculationsQueue: string
  currentInput: string
}

const initialCalculatorState: CalculatorState = {
  calculationsQueue: '',
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
