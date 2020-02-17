const mockPackageIndex = require('../../__test-utils__/dpkgStatusSample').index
const { serializeDepends } = require('../../src/formatters')
let packageIndex

beforeAll(async () => {
  packageIndex = serializeDepends(mockPackageIndex)
})

describe('serializeDepends formatter', () => {
  it('serialises Depends to an object regardless of it having deps or not', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]
      expect(currentPackage.Depends).toBeType('object')
    }
  })

  it('serialises dependencies and maps alternates to an array of strings', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]

      for (const dep in currentPackage.Depends) {
        const currentDependency = currentPackage.Depends[dep]

        // Check that alternates exists and is an array of strings
        expect(currentDependency).toHaveProperty('alternates')
        expect(currentDependency.alternates).toBeType('array')
        currentDependency.alternates.forEach(alternate => expect(alternate).toBeType('string'))
      }
    }
  })
})
