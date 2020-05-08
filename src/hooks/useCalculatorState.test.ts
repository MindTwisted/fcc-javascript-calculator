import { renderHook, act } from '@testing-library/react-hooks'
import useCalculatorState from './useCalculatorState'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['-', '+', '/', '*']

test('should process number input when current input and calculations queue are empty', () => {
  numbers.forEach(number => {
    const initialCalculatorState = {
      calculationsQueue: '',
      currentInput: ''
    }
    const input = number
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
    expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
  })
})

test('should process number input when current input consists of numbers and calculations queue are empty', () => {
  numbers.forEach(number => {
    const initialCalculatorState = {
      calculationsQueue: '',
      currentInput: '12'
    }
    const input = number
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
    expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
  })
})

test('should process zero number input only once when current input is empty', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: ''
  }
  const input = '0'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })
  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
})

test('should process zero number input multiple times when current input consists of numbers', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: '23'
  }
  const input = '0'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })
  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input + input)
})

test('should not process dot input when current input are empty', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: ''
  }
  const input = '.'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should process dot input only once when current input consists of numbers', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: '23'
  }
  const input = '.'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })
  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
})

test('should not process dot input when current input consists of numbers with dot in the middle', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: '23.23'
  }
  const input = '.'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should process operator input when current input and calculations queue are empty', () => {
  operators.forEach(operator => {
    const initialCalculatorState = {
      calculationsQueue: '',
      currentInput: ''
    }
    const input = operator
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue).toBe('0')
    expect(result.current.state.currentInput).toBe(input)
  })
})

test('should process operator input when current input contains operator and calculations queue ends with number', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: '255',
      currentInput: initialStateOperator
    }

    operators.forEach(inputOperator => {
      const input = inputOperator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should process number input when current input contains operator and calculations queue ends with number', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: '255',
      currentInput: initialStateOperator
    }

    numbers.forEach(number => {
      const input = number
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue).toBe(
          `${initialCalculatorState.calculationsQueue} ${initialStateOperator}`
      )
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should process operator input when current input contains number and calculations queue ends with operator', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: `255 ${initialStateOperator}`,
      currentInput: '323'
    }

    operators.forEach(inputOperator => {
      const input = inputOperator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue).toBe(
          `${initialCalculatorState.calculationsQueue} ${initialCalculatorState.currentInput}`
      )
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should be able to calculate result when calculation queue contains expression and current input contains number', () => {
  const initialCalculatorState = {
    calculationsQueue: '255 + 323 -',
    currentInput: '100'
  }

  const input = '='
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(
      `${initialCalculatorState.calculationsQueue} ${initialCalculatorState.currentInput} = ${255 + 323 - 100}`
  )
  expect(result.current.state.currentInput).toBe(String(255 + 323 - 100))
})

test('should be able to calculate result when calculation queue contains expression and current input contains operator', () => {
  const initialCalculatorState = {
    calculationsQueue: '255 + 323 - 100',
    currentInput: '+'
  }

  const input = '='
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(
      `${initialCalculatorState.calculationsQueue} = ${255 + 323 - 100}`
  )
  expect(result.current.state.currentInput).toBe(String(255 + 323 - 100))
})

test('should be able to calculate result when calculation queue is empty and current input contains number', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: '87'
  }

  const input = '='
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue).toBe(
      `${initialCalculatorState.currentInput} = ${initialCalculatorState.currentInput}`
  )
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should be able to continue calculations with the result of previous calculation', () => {
  const initialCalculatorState = {
    calculationsQueue: '25 + 25 - 10 = 40',
    currentInput: '40'
  }

  operators.forEach(operator => {
    const input = operator
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.currentInput)
    expect(result.current.state.currentInput).toBe(input)
  })
})

test('should be able to start new calculation when the result of previous calculation is on the display', () => {
  const initialCalculatorState = {
    calculationsQueue: '25 + 25 - 10 = 40',
    currentInput: '40'
  }

  numbers.forEach(number => {
    const input = number
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue).toBe('')
    expect(result.current.state.currentInput).toBe(input)
  })
})

test('should be able to enter only up to 15 number characters', () => {
  const initialCalculatorState = {
    calculationsQueue: '',
    currentInput: ''
  }
  const input = '7'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  for (let i = 0; i < 20; i++) {
    act(() => {
      result.current.processInput(input)
    })
  }

  expect(result.current.state.calculationsQueue).toBe(initialCalculatorState.calculationsQueue)
  expect(result.current.state.currentInput).toBe(input.repeat(15))
})
