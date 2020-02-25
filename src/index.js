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
    const formatted = serializeDepends(filtered) // Serialize Depends field to JSON
    const withDependents = parseDependents(formatted) // Map potential dependents of each package
    const htmlList = generateHTML(withDependents) // Generate the HTML index
    await createHTMLIndex(htmlList) // Write the final output to pages/index.html
  } catch (err) {
    throw new Error(`Failed to export /var/lib/dpkg/status to HTML:\n${err}`)
  }
}
