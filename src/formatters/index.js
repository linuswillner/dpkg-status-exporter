// Export the contents of the entire formatter directory recursively for easier access

const fs = require('fs')
const path = require('path')

const formatters = fs.readdirSync(__dirname)
  .filter(formatter => formatter !== 'index.js') // Exclude this file
  .map(formatter => {
    return {
      name: formatter.split('.')[0],
      path: path.join(__dirname, formatter)
    }
  })

for (const formatter of formatters) {
  module.exports[formatter.name] = require(formatter.path)
}
