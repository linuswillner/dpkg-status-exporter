# dpkg-status-exporter

A simple and lightweight program to export an HTML index with some key information about operating system packages on Debian based systems, using `/var/lib/dpkg/status`.

## Installation

This program requires Node.js and NPM to run.

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

A manual override for the location of the dpkg status data, allowing the usage of mock data (Such as the bundled `status.real` file).

**Note:** For security reasons, this option is ignored unless `process.env.DEBUG` is set to `true`.

## Testing

To run the unit tests, run `npm test`. Make sure you have all development dependencies installed.
