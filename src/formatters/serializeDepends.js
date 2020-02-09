/**
 * Strip version numbers from the Depends field and format it to an array
 * @param {Object} packageList Serialised dpkg status data (Extraneous field filtering is not necessary but recommended)
 */
module.exports = packageList => {
  for (const pkg in packageList) {
    const currentPackage = packageList[pkg]

    // Only process packages that have dependencies
    if (currentPackage.Depends) {
      // Strip version numbers and format to an array
      const stripped = currentPackage.Depends.replace(/ \(([^)]+)\)/g, '')
      const dependencyList = stripped.split(', ')

      const dependencies = {}

      for (const dep of dependencyList) {
        // Check if dependency has alternates
        if (dep.includes('|')) {
          const alternates = dep.split(' | ')

          // First dependency is the original dependency, use that as the name
          const name = alternates.splice(0, 1)[0]
          dependencies[name] = { alternates }
        } else {
          // The dependency has no alternates
          dependencies[dep] = { alternates: [] }
        }
      }

      // Replace current dependency list with the new objectified list
      currentPackage.Depends = dependencies
    } else {
      // Normalise packages with no dependencies to an empty object
      currentPackage.Depends = {}
    }

    // Update package data
    packageList[pkg] = currentPackage
  }

  return packageList
}
