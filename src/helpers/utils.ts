export const isNumber = (value: string): boolean => /^[0-9]$/.test(value)
export const isZero = (value: string): boolean => /^0$/.test(value)
export const isOperator = (value: string): boolean => /^[+\-*=/]$/.test(value)
export const isEqualOperator = (value: string): boolean => /^=$/.test(value)
export const isDot = (value: string): boolean => /^\.$/.test(value)
export const isEmptyString = (value: string): boolean => value.length === 0
export const isStringOfNumbers = (value: string): boolean => /^[0-9]+$/.test(value)
export const isStringOfNumbersEndsWithDot = (value: string): boolean => /^[0-9]+\.$/.test(value)
export const isStringOfNumbersWithDotInTheMiddle = (value: string): boolean => /^[0-9]+\.[0-9]+$/.test(value)
export const isStringEndsWithNumber = (value: string): boolean => isNumber(value[value.length - 1])
export const isStringEndsWithOperator = (value: string): boolean => isOperator(value[value.length - 1])
export const isStringWithEqualOperator = (value: string): boolean => /^.*=.*$/.test(value)
export const appendToString = (value: string, str: string, withSpace = false): string => {
  return `${str}${withSpace ? ' ' : ''}${value}`.trim()
}
