import React from 'react'
import './CalculatorButton.css'

type CalculatorButtonProps = {
    value: string
    textColor: string
    onClick: (value: string) => void
    [x: string]: any
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ value, textColor, onClick, ...rest }: CalculatorButtonProps) => {
  return (
    <button
      className={`CalculatorButton button is-fullwidth is-${textColor}`}
      onClick={() => onClick(value)}
      {...rest}
    >
      {value}
    </button>
  )
}

export default CalculatorButton
