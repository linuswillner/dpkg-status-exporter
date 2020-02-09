// Creates a link element with a reference to the package in question that will jump to it and open its details
const createLink = packageName => `<a href="#${packageName}" onclick="jumpToPackage('${packageName}')">${packageName}</a>`

// Merge dependencies into an array and map alternates, if any, to links (If present in the index)
const processDependencies = (dependencies, packageList) => {
  const dependencyList = []

  for (const dep in dependencies) {
    const { alternates } = dependencies[dep]

    if (alternates.length > 0) {
      // If alternate is included in the index, linkify it, otherwise just print its name
      const alternateLinks = alternates.map(alt => packageList[alt] ? createLink(alt) : alt)
      // Create link for original dependency as well and join it together with its alternates
      const formattedDependencies = `${createLink(dep)} | ${alternateLinks.join(' | ')}`
      dependencyList.push(formattedDependencies)
    } else {
      dependencyList.push(createLink(dep))
    }
  }

  return dependencyList
}

/**
 * Strip version numbers from the Depends field and format it to an array
 * @param {Object} packageList Fully serialised and processed dpkg status data
 */
module.exports = packageList => {
  const packageDetails = []

  for (const pkg in packageList) {
    const currentPackage = packageList[pkg]
    const dependencyLinks = processDependencies(currentPackage.Depends, packageList).join(', ')
    const dependentLinks = currentPackage.Dependents.map(dep => createLink(dep)).join(', ')

    const html = `
      <li>
        <details id="${pkg}">
          <summary>${pkg}</summary>
          <div><b>Name:</b> ${pkg}</div>
          <div><b>Description:</b> ${currentPackage.Description.replace(/\n/g, '<br>')}</div>
          <div>${currentPackage.Depends ? `<b>Dependencies:</b> ${dependencyLinks}` : ''}</div>
          <div>${currentPackage.Dependents.length > 0 ? `<b>Dependents:</b> ${dependentLinks}` : ''}</div>
        </details>
      </li>
    `.trimRight() // Trim excess start and end whitespace

    packageDetails.push(html)
  }

  return packageDetails
}
