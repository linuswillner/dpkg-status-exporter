/**
 * @jest-environment jsdom
 */

const { getByTestId } = require('@testing-library/dom')
const createMockPackageIndex = require('../../test-utils/createMockPackageIndex')
const {
  filterExtraFields,
  serializeDepends,
  parseDependents,
  generateHTML
} = require('../../src/formatters')

let packageIndex

beforeAll(async () => {
  const index = await createMockPackageIndex()
  packageIndex = generateHTML(parseDependents(serializeDepends(filterExtraFields(index))))
  document.body.innerHTML = packageIndex.join('')
})

describe('generateHTML formatter', () => {
  it('generates an array of HTML strings', () => {
    expect(packageIndex).toBeType('array')
    packageIndex.forEach(pkg => expect(pkg).toBeType('string'))
  })

  it.only('generates a valid HTML structure', () => {
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

/*
      expect(fields[0]).toEqual('<li>')
      expect(fields[1]).toEqual(expect.stringMatching(/<details id="\S+">/gi))
      expect(fields[2]).toEqual(expect.stringMatching(/<summary>\S+<\/summary>/gi))
      expect(fields[3]).toEqual(expect.stringMatching(/<div name="name"><b>Name:<\/b> \S+<\/div>/gi))
      expect(fields[4]).toEqual(expect.stringMatching(/<div name="description"><b>Description:<\/b> \S+<\/div>/gi))
      expect(fields[5]).toEqual(expect.stringMatching(/<div name="dependencies">\S*<\/div>/gi))
      expect(fields[6]).toEqual(expect.stringMatching(/<div name="dependents">\S*<\/div>/gi))
      expect(fields[7]).toEqual('</details>')
      expect(fields[7]).toEqual('</li>')
*/