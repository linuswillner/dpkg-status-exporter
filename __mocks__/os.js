const os = jest.genMockFromModule('os')

let currentPlatform

/**
 * Overrides the return value of os.platform().
 * @param {String} platform Desired platform to mock.
 * @see https://nodejs.org/api/os.html#os_os_platform
 */
function __setPlatformOverride (newPlatform) {
  currentPlatform = newPlatform
}

function platform () {
  return currentPlatform
}

os.__setPlatformOverride = __setPlatformOverride
os.platform = platform

module.exports = os
