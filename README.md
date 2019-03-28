# XtrmAddons Node Network [![fr-FR](https://github.com/shim-sao/assets/blob/master/images/france-flag-icon-16.png)](README.fr-FR.md)

This directory is intended to compile in a class of utilities a series of functions to perform actions on network interfaces.

## Install

Execute the following command for the installation of the modules:

### Method 1

```batch
npm install --save https://github.com/shim-sao/xtrmaddons-node-network
```

### Method 2

```js
// Adding the file dependency package.json
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    // Direct link to the current branch of the Git Repository.
    // Copy/paste this dependency.
    "xtrmaddons-node-network": "shim-sao/xtrmaddons-node-network"
  }
}
```

After adding the needed dependencies in the list, execute the following command for the installation of the modules:

```batch
npm run install
```

---

## [API Documentation](docs/README.md)

Documentation of the functions contain in the API.

---

## Development

### Build

Command to perform Babel compilation for distribution :

```batch
npm run build
```

### Tests Mocha

Command to perform unit tests with Mocha :

```batch
npm run test
```

### Eslint fix

Command to perform fix with Eslint :

```batch
npm run eslint
```