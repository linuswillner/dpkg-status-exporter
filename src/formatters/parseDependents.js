// Scan package list for dependents of a package
const scanForDependents = (packageName, packageList) => {
  const dependents = []

  for (const pkg in packageList) {
    // Dependencies are listed with their names as keys, format them into an array for easier inclusion checking
    const dependencies = Object.keys(packageList[pkg].Depends)
    if (dependencies.includes(packageName)) dependents.push(pkg)
  }

  return dependents
}

/**
 * Map package dependents such that each package has a list of possible dependents
 * @param {Object} packageList Serialised dpkg status index that has dependencies already parsed
 * @returns {Object} Index where a Dependents field has been added with all the dependents of a package
 */
module.exports = packageList => {
  for (const pkg in packageList) {
    const dependents = scanForDependents(pkg, packageList)
    packageList[pkg].Dependents = dependents
  }

  return packageList
}
