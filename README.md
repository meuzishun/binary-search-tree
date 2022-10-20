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

### Git

I forgot to include a .gitignore file and committed the node_modules directory. Fix by creating a .gitignore file:

```
touch .gitignore
```

Then add node_modules to that file and commit those changes.

Next, remove node_modules from git's index:

```
git rm -r --cached node_modules
```

Commit and push.
(source: https://dev.to/momentum/what-to-do-if-you-accidentally-committed-your-nodemodules-323o)

### Creating the Node Factory

Test for: methods existing and working, properties are private and throw error when directly altered.

Store the node object and functions that act on that object inside the main function.

```javascript
export function createNode(value) {
  const node = {
    value: value,
    left: null,
    right: null,
  };

  function getValueMethod(node) {
    return {
      getValue() {
        return node.value;
      },
    };
  }

  function setValueMethod(node) {
    return {
      setValue(value) {
        node.value = value;
      },
    };
  }

  //etc.
}
```

Returning Object.assign with an empty object and function calls that return the desired methods creates the closure needed to make properties private.

```javascript
Object.assign(
  {},
  getValueMethod(node),
  setValueMethod(node),
  getLeftMethod(node),
  setLeftMethod(node),
  getRightMethod(node),
  setRightMethod(node)
);
```

Encasing all that in Object.freeze disallows any alteration.

```javascript
Object.freeze(
  Object.assign(
    {},
    getValueMethod(node),
    setValueMethod(node),
    getLeftMethod(node),
    setLeftMethod(node),
    getRightMethod(node),
    setRightMethod(node)
  )
);
```
