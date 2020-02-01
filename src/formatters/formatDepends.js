/**
 * Strip version numbers from the Depends field and format it to an array
 * @param packageData Serialised dpkg status data
 * @see https://www.reaktor.com/junior-dev-assignment/
 */
module.exports = packageData => {
  for (const pkg in packageData) {
    const currentPackage = packageData[pkg]

    // Only process packages that have dependencies
    if (currentPackage.Depends) {
      // Strip version numbers and format to an array
      const stripped = currentPackage.Depends.replace(/ \(([^)]+)\)/g, '')
      const dependencyList = stripped.split(', ')

      const dependencies = {}

      // Format dependencies from a text-only list into the dependency record with possible alternates listed
      dependencyList.forEach(dep => {
        // Check if dependency has alternates
        if (dep.includes('|')) {
          const alternates = dep.split(' | ')

          // First dependency is the original dependency, use that as the name
          const name = alternates.splice(0, 1)[0]
          dependencies[name] = { alternates }
        } else {
          // The dependency has no alternates, so use it alone as the key
          dependencies[dep] = { alternates: [] }
        }
      })

      // Replace current dependency list with the new objectified list
      currentPackage.Depends = dependencies
    } else {
      // Normalise packages with no dependencies to an empty object
      currentPackage.Depends = {}
    }

    // Replace old package data with the changed data
    packageData[pkg] = currentPackage
  }

  return packageData
}
