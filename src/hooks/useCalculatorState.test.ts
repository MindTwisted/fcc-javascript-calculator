import { renderHook, act } from '@testing-library/react-hooks'
import useCalculatorState from './useCalculatorState'
import CalculationEngine from '../helpers/CalculationEngine'
import CalculationQueue from '../helpers/CalculationQueue'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['-', '+', '/', '*']

test('should process number input when current input and calculations queue are empty', () => {
  numbers.forEach(number => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(),
      currentInput: ''
    }
    const input = number
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue.getQueueAsArray())
      .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
    expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
  })
})

test('should process number input when current input consists of numbers and calculations queue are empty', () => {
  numbers.forEach(number => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(),
      currentInput: '12'
    }
    const input = number
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue.getQueueAsArray())
      .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
    expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
  })
})

test('should process zero number input only once when current input is empty', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
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

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
})

test('should process zero number input multiple times when current input consists of numbers', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
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

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input + input)
})

test('should not process dot input when current input are empty', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
    currentInput: ''
  }
  const input = '.'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should process dot input only once when current input consists of numbers', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
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

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput + input)
})

test('should not process dot input when current input consists of numbers with dot in the middle', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
    currentInput: '23.23'
  }
  const input = '.'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should process operator input when current input and calculations queue are empty', () => {
  operators.forEach(operator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(),
      currentInput: ''
    }
    const input = operator
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(['0'])
    expect(result.current.state.currentInput).toBe(input)
  })
})

test('should process operator input when current input contains operator and calculations queue ends with number', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(['255']),
      currentInput: initialStateOperator
    }

    operators.forEach(inputOperator => {
      const input = inputOperator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      if (input === '-') {
        expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
          [...initialCalculatorState.calculationsQueue.getQueueAsArray(), initialCalculatorState.currentInput]
        )
        expect(result.current.state.currentInput).toBe(input)
      } else {
        expect(result.current.state.calculationsQueue.getQueueAsArray())
          .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
        expect(result.current.state.currentInput).toBe(input)
      }
    })
  })
})

test('should process operator input when current input contains minus operator and calculations queue ends with operator', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(['255', initialStateOperator]),
      currentInput: '-'
    }

    operators.forEach(inputOperator => {
      const input = inputOperator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(['255'])
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should process number input when current input contains minus operator and calculations queue ends with operator', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(['255', initialStateOperator]),
      currentInput: '-'
    }

    numbers.forEach(number => {
      const input = number
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray())
        .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
      expect(result.current.state.currentInput).toBe(`-${input}`)
    })
  })
})

test('should process number input when current input contains operator and calculations queue ends with number', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(['255']),
      currentInput: initialStateOperator
    }

    numbers.forEach(number => {
      const input = number
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
        [...initialCalculatorState.calculationsQueue.getQueueAsArray(), initialStateOperator]
      )
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should process operator input when current input contains number and calculations queue ends with operator', () => {
  operators.forEach(initialStateOperator => {
    const initialCalculatorState = {
      calculationsQueue: new CalculationQueue(['255', initialStateOperator]),
      currentInput: '323'
    }

    operators.forEach(inputOperator => {
      const input = inputOperator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
        [...initialCalculatorState.calculationsQueue.getQueueAsArray(), initialCalculatorState.currentInput]
      )
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should be able to calculate result when calculation queue contains expression and current input contains number', () => {
  const testCases = [
    {
      calculationsQueue: new CalculationQueue(['255', '+', '323', '-']),
      currentInput: '100'
    },
    {
      calculationsQueue: new CalculationQueue(['1000', '-', '2500', '+', '333', '/', '7575', '-']),
      currentInput: '1002'
    },
    {
      calculationsQueue: new CalculationQueue(['1000', '-', '333', '/', '7575', '-']),
      currentInput: '-5002'
    },
    {
      calculationsQueue: new CalculationQueue(['777', '+', '88', '/']),
      currentInput: '9999'
    }
  ]

  testCases.forEach(testCase => {
    const initialCalculatorState = {
      calculationsQueue: testCase.calculationsQueue,
      currentInput: testCase.currentInput
    }

    const input = '='
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    const resultCalculationsQueue = initialCalculatorState.calculationsQueue
      .appendToQueue(initialCalculatorState.currentInput)
    const calculationsResult = CalculationEngine.formatOutput(
      // eslint-disable-next-line no-eval
      eval(resultCalculationsQueue.getQueueAsArray().join(' '))
    )

    expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
      [...resultCalculationsQueue.getQueueAsArray(), '=', calculationsResult]
    )
    expect(result.current.state.currentInput).toBe(calculationsResult)
  })
})

test('should be able to calculate result when calculation queue contains expression and current input contains operator', () => {
  const testCases = [
    {
      calculationsQueue: new CalculationQueue(['255', '+', '323', '-', '100']),
      currentInput: '+'
    },
    {
      calculationsQueue: new CalculationQueue(['333', '-', '555', '*', '233', '/', '222']),
      currentInput: '-'
    },
    {
      calculationsQueue: new CalculationQueue(['88', '/', '9999']),
      currentInput: '-'
    }
  ]

  testCases.forEach(testCase => {
    const initialCalculatorState = {
      calculationsQueue: testCase.calculationsQueue,
      currentInput: testCase.currentInput
    }

    const input = '='
    const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

    act(() => {
      result.current.processInput(input)
    })

    const calculationsResult = CalculationEngine.formatOutput(
      // eslint-disable-next-line no-eval
      eval(initialCalculatorState.calculationsQueue.getQueueAsArray().join(' '))
    )

    expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
      [...initialCalculatorState.calculationsQueue.getQueueAsArray(), '=', calculationsResult]
    )
    expect(result.current.state.currentInput).toBe(calculationsResult)
  })
})

test('should be able to calculate result when calculation queue is empty and current input contains number', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
    currentInput: '87'
  }

  const input = '='
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual(
    [initialCalculatorState.currentInput, '=', initialCalculatorState.currentInput]
  )
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should not be able to calculate result when calculation queue and current input are empty', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
    currentInput: ''
  }

  const input = '='
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  act(() => {
    result.current.processInput(input)
  })

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(initialCalculatorState.currentInput)
})

test('should be able to continue calculations with the result of previous calculation', () => {
  const testCases = [
    {
      calculationsQueue: new CalculationQueue(['25', '+', '25', '-', '10', '=', '40']),
      currentInput: '40'
    },
    {
      calculationsQueue: new CalculationQueue(['255', '-', '300', '=', '-45']),
      currentInput: '-45'
    },
    {
      calculationsQueue: new CalculationQueue(['88', '/', '9999', '=', '‭0.0088‬']),
      currentInput: '0.0088'
    }
  ]

  testCases.forEach(testCase => {
    const initialCalculatorState = {
      calculationsQueue: testCase.calculationsQueue,
      currentInput: testCase.currentInput
    }

    operators.forEach(operator => {
      const input = operator
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual([initialCalculatorState.currentInput])
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should be able to start new calculation when the result of previous calculation is on the display', () => {
  const testCases = [
    {
      calculationsQueue: new CalculationQueue(['25', '+', '25', '-', '10', '=', '40']),
      currentInput: '40'
    },
    {
      calculationsQueue: new CalculationQueue(['255', '-', '300', '=', '-45']),
      currentInput: '-45'
    },
    {
      calculationsQueue: new CalculationQueue(['55', '/', '999', '=', '0.0551‬']),
      currentInput: '0.0551'
    }
  ]

  testCases.forEach(testCase => {
    const initialCalculatorState = {
      calculationsQueue: testCase.calculationsQueue,
      currentInput: testCase.currentInput
    }

    numbers.forEach(number => {
      const input = number
      const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

      act(() => {
        result.current.processInput(input)
      })

      expect(result.current.state.calculationsQueue.getQueueAsArray()).toEqual([])
      expect(result.current.state.currentInput).toBe(input)
    })
  })
})

test('should be able to enter only up to 15 number characters', () => {
  const initialCalculatorState = {
    calculationsQueue: new CalculationQueue(),
    currentInput: ''
  }
  const input = '7'
  const { result } = renderHook(() => useCalculatorState({ ...initialCalculatorState }))

  for (let i = 0; i < 20; i++) {
    act(() => {
      result.current.processInput(input)
    })
  }

  expect(result.current.state.calculationsQueue.getQueueAsArray())
    .toEqual(initialCalculatorState.calculationsQueue.getQueueAsArray())
  expect(result.current.state.currentInput).toBe(input.repeat(15))
})
