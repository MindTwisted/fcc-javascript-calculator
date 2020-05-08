import React from 'react'
import './CalculatorDisplay.css'
import { CalculatorState } from '../hooks/useCalculatorState'

type CalculatorDisplayProps = {
    calculatorState: CalculatorState
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ calculatorState }: CalculatorDisplayProps) => {
  return (
    <header className='CalculatorDisplay card-header has-background-grey-lighter'>
      <div className='card-header-title has-text-right'>
        <p className='has-text-grey'>{calculatorState.calculationsQueue}</p>
        <p className='is-size-3' id='display'>{calculatorState.currentInput || 0}</p>
      </div>
    </header>
  )
}

export default CalculatorDisplay
