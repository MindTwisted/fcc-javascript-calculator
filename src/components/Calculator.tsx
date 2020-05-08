import React from 'react'
import './Calculator.css'
import CalculatorDisplay from './CalculatorDisplay'
import CalculatorControls from './CalculatorControls'
import useCalculatorState from '../hooks/useCalculatorState'

const Calculator = () => {
  const {
    state,
    processInput,
    resetCalculator
  } = useCalculatorState()

  return (
    <div className='card Calculator'>
      <CalculatorDisplay calculatorState={state}/>
      <CalculatorControls
        processInput={processInput}
        resetCalculator={resetCalculator}
      />
    </div>
  )
}

export default Calculator
