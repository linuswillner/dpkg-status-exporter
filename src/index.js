const debCtrlToJson = require('./debian-control-to-json')
const readDpkgStatus = require('./utils/readDpkgStatus')
const createHTMLIndex = require('./utils/createHTMLIndex')
const {
  filterExtraFields,
  serializeDepends,
  parseDependents,
  generateHTML
} = require('./formatters')

module.exports = async dpkgStatusLocationOverride => {
  try {
    const dpkgStatus = await readDpkgStatus(dpkgStatusLocationOverride || '/var/lib/dpkg/status')
    const serialised = debCtrlToJson(dpkgStatus) // Serialize Debian control file syntax to JSON
    const filtered = filterExtraFields(serialised) // Filter redundant fields from the serialised data
    const formatted = serializeDepends(filtered) // Serialize Depends field
    const withDependents = await parseDependents(formatted) // Parse out the dependents of each package
    const htmlList = generateHTML(withDependents) // Generate an HTML index of the package index
    await createHTMLIndex(htmlList) // Write the final output to pages/index.html
  } catch (err) {
    throw new Error(`Failed to export /var/lib/dpkg/status to HTML:\n${err}`)
  }
}
