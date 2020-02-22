// Export the contents of the entire formatter directory simultaenously for easier access
// BUG: This is hardcoded because fs.readdirSync returns undefined when mocking for some reason, which is the only known way to do this

module.exports = {
  filterExtraFields: require('./filterExtraFields'),
  generateHTML: require('./generateHTML'),
  parseDependents: require('./parseDependents'),
  serializeDepends: require('./serializeDepends')
}
