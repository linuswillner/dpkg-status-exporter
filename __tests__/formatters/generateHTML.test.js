/**
 * @jest-environment jsdom
 */

const { getByTestId } = require('@testing-library/dom')
const mockPackageIndex = require('../../__test-utils__/dpkgStatusSample').index
const {
  filterExtraFields,
  serializeDepends,
  parseDependents,
  generateHTML
} = require('../../src/formatters')

let packageIndex

beforeAll(() => {
  // TODO: When the ESNext pipeline operator is introduced, port this code to it
  packageIndex = generateHTML(parseDependents(serializeDepends(filterExtraFields(mockPackageIndex))))
  document.body.innerHTML = packageIndex.join('')
})

describe('generateHTML formatter', () => {
  it('generates an array of HTML strings', () => {
    expect(packageIndex).toBeType('array')
    packageIndex.forEach(pkg => expect(pkg).toBeType('string'))
  })

  it('generates a valid HTML structure', () => {
    const packages = Array.from(document.querySelectorAll('li')).map(pkg => {
      // Create a temporary container so that the existence of the list item (Container) can be checked
      const container = document.createElement('div')
      container.appendChild(pkg)
      return container
    })

    for (const pkg of packages) {
      const elements = {}

      ;[
        'package',
        'details',
        'summary',
        'name',
        'description',
        'dependencies',
        'dependents'
      ].forEach(testid => { elements[testid] = getByTestId(pkg, testid) })

      expect(elements.package).toContainElement(elements.details)
      expect(elements.details).toHaveAttribute('id')
      expect(elements.details).toContainElement(elements.summary)
      expect(elements.name).toHaveTextContent(/Name: \S+/gi)
      expect(elements.description).toHaveTextContent(/Description: \S+/gi)
      expect(elements.details).toContainElement(elements.dependencies)
      expect(elements.dependencies).not.toBeEmpty()
      expect(elements.details).toContainElement(elements.dependents)
      expect(elements.dependents).not.toBeEmpty()
    }
  })
})
