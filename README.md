# dpkg-status-exporter

A simple and lightweight program to export an HTML index with some key information about operating system packages on Debian based systems, using `/var/lib/dpkg/status`.

## Installation

This program requires Node.js version 10 or above.

```bash
git clone https://github.com/linuswillner/dpkg-status-exporter.git

# Optional: Install additional debug tools
npm i --no-optional

# Optional: Install the above + linting and unit testing tools
npm i
```

## Usage

To run the program with its default settings, run `npm start`.

If you wish to make some tweaks, the server takes the following parameters:

```bash
node server.js [port] [fileLocationOverride]
```

#### [port]

Port to run the HTTP server on. Default is 6500.

#### [fileLocationOverride]

A manual override for the location of the dpkg status data, allowing the usage of mock data.

**Note:** For security reasons, this option is ignored unless `process.env.DEBUG` is set to `true`. This is already set for the `start-debug` and `start-dev` scripts.

## Running on non-Debian systems

Out of the box, this program only supports Debian based systems that use `dpkg` for package management since it requires access to `/var/lib/dpkg/status` and will throw an error if this file cannot be found.

However, for development, it can be run on non-Debian systems by passing a reference to an extracted dpkg status index file using the `fileLocationOverride` parameter. One such file is bundled with this repository for development purposes, namely `status.real`.

## Testing

To run the unit tests, run `npm test`. Make sure you have all development dependencies installed.
