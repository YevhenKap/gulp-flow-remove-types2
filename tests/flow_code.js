// @flow

function isNumber(value: mixed): boolean %checks {
  return typeof value === 'number'
}

function multiply(one: number, two: number): number {
  if (isNumber(one) && isNumber(two)) {
    return one * two
  } else {
    return NaN
  }
}

module.exports = multiply
