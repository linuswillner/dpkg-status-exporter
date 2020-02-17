// Export the contents of the entire formatter directory for easier access
// BUG: Having to hardcode this because fs.readdirSync returns undefined when mocking, which is the only known way to do this

module.exports = {
  filterExtraFields: require('./filterExtraFields'),
  generateHTML: require('./generateHTML'),
  parseDependents: require('./parseDependents'),
  serializeDepends: require('./serializeDepends')
}
