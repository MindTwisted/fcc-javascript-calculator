import React from 'react'
import CalculatorButton from './CalculatorButton'

type CalculatorControlsProps = {
  processInput: (value: string) => void
  resetCalculator: () => void
}

const CalculatorControls: React.FC<CalculatorControlsProps> = ({
  processInput,
  resetCalculator
}: CalculatorControlsProps) => {
  return (
    <div className='card-content'>
      <div className='content calculator__controls'>
        <div className='columns is-multiline is-mobile'>
          <div className='column is-half'>
            <CalculatorButton
              value='AC'
              textColor='danger'
              onClick={resetCalculator}
              id='clear'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='/'
              textColor='light'
              onClick={processInput}
              id='divide'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='*'
              textColor='light'
              onClick={processInput}
              id='multiply'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='7'
              textColor='primary'
              onClick={processInput}
              id='seven'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='8'
              textColor='primary'
              onClick={processInput}
              id='eight'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='9'
              textColor='primary'
              onClick={processInput}
              id='nine'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='-'
              textColor='light'
              onClick={processInput}
              id='subtract'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='4'
              textColor='primary'
              onClick={processInput}
              id='four'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='5'
              textColor='primary'
              onClick={processInput}
              id='five'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='6'
              textColor='primary'
              onClick={processInput}
              id='six'
            />
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='+'
              textColor='light'
              onClick={processInput}
              id='add'
            />
          </div>
          <div className='column is-three-quarters'>
            <div className='columns is-multiline is-mobile'>
              <div className='column is-one-third'>
                <CalculatorButton
                  value='1'
                  textColor='primary'
                  onClick={processInput}
                  id='one'
                />
              </div>
              <div className='column is-one-third'>
                <CalculatorButton
                  value='2'
                  textColor='primary'
                  onClick={processInput}
                  id='two'
                />
              </div>
              <div className='column is-one-third'>
                <CalculatorButton
                  value='3'
                  textColor='primary'
                  onClick={processInput}
                  id='three'
                />
              </div>
              <div className='column is-two-thirds'>
                <CalculatorButton
                  value='0'
                  textColor='primary'
                  onClick={processInput}
                  id='zero'
                />
              </div>
              <div className='column is-one-third'>
                <CalculatorButton
                  value='.'
                  textColor='primary'
                  onClick={processInput}
                  id='decimal'
                />
              </div>
            </div>
          </div>
          <div className='column is-one-quarter'>
            <CalculatorButton
              value='='
              textColor='info'
              onClick={processInput}
              id='equals'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorControls
