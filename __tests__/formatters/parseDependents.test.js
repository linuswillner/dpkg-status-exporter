const mockPackageIndex = require('../../__test-utils__/dpkgStatusSample').index
const { serializeDepends, parseDependents } = require('../../src/formatters')
let packageIndex

beforeAll(async () => {
  packageIndex = parseDependents(serializeDepends(mockPackageIndex))
})

describe('parseDependents formatter', () => {
  it('serialises the dependents (reverse dependencies) of a package to an array of strings', () => {
    for (const pkg in packageIndex) {
      const dependents = packageIndex[pkg].Dependents

      // Check that depents is an array of strings
      expect(dependents).toBeType('array')
      dependents.forEach(dependent => expect(dependent).toBeType('string'))
    }
  })
})
