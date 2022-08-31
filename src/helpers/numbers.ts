const isNumber = (value: unknown): value is number => typeof value === 'number'
const isPositiveNumber = (value: unknown): boolean => isNumber(value) && Math.sign(value) === 1
const isNegativeNumber = (value: unknown): boolean => isNumber(value) && Math.sign(value) === -1
const roundNumber = (value: number): number => Math.round(value * 100) / 100
const formatPrice = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(value)
}

export { isNumber, isPositiveNumber, isNegativeNumber, roundNumber, formatPrice }
