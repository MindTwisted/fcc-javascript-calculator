export const isNumber = (value: string): boolean => /^[0-9]$/.test(value)
export const isOperator = (value: string): boolean => /^[+\-*=/]$/.test(value)
export const isZero = (value: string): boolean => value === '0'
export const isEqualOperator = (value: string): boolean => value === '='
export const isMinusOperator = (value: string): boolean => value === '-'
export const isPlusOperator = (value: string): boolean => value === '+'
export const isMultiplyOperator = (value: string): boolean => value === '*'
export const isDivisionOperator = (value: string): boolean => value === '/'
export const isDot = (value: string): boolean => value === '.'
export const isEmptyString = (value: string): boolean => value.length === 0
export const isStringOfNumbers = (value: string): boolean => /^-?[0-9]+$/.test(value)
export const isStringOfNumbersEndsWithDot = (value: string): boolean => /^-?[0-9]+\.$/.test(value)
export const isStringOfNumbersWithDotInTheMiddle = (value: string): boolean => /^-?[0-9]+\.[0-9]+$/.test(value)
