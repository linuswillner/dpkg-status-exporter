// Jest expect() extensions setup file

const { toBeType } = require('jest-tobetype')
const {
  toBeEmpty,
  toBeInTheDocument,
  toContainElement,
  toContainHTML,
  toHaveAttribute,
  toHaveTextContent
} = require('@testing-library/jest-dom/matchers')

expect.extend({
  toBeType,
  toBeEmpty,
  toBeInTheDocument,
  toContainElement,
  toContainHTML,
  toHaveAttribute,
  toHaveTextContent
})
