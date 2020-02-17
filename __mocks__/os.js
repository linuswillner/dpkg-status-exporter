const os = jest.genMockFromModule('os')

let currentPlatform

// Override the return value of os.platform()
function __setPlatformOverride (newPlatform) {
  currentPlatform = newPlatform
}

// Mocks for various OS functions

function platform () {
  return currentPlatform
}

os.__setPlatformOverride = __setPlatformOverride
os.platform = platform

module.exports = os
