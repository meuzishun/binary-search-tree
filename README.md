# Binary Search Tree

## Notes

### Setting up Node

Import/Export syntax does not work by default with node.js. Change package.json to include this just under name:

```javascript
"type": "module",
```

### Setting up Jest

Import/Export syntax also does not work with Jest. Install babel in the terminal with the following command (source: https://solaaremupelumi.medium.com/using-es6-import-and-export-statements-for-jest-testing-in-node-js-b20c8bd9041c):

```
npm install --save-dev babel-jest @babel/preset-evn
```

Then create a babel.config.cjs file (why use .cjs? No idea: https://stackoverflow.com/questions/61146112/error-while-loading-config-you-appear-to-be-using-a-native-ecmascript-module-c):

```
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

```
