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

### Create Tree

First thing, remove duplicates and mergeSort the array before building the tree:

```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function merge(arr1, arr2) {
  const sorted = [];
  while (arr1.length > 0 && arr2.length > 0) {
    arr1[0] < arr2[0] ? sorted.push(arr1.shift()) : sorted.push(arr2.shift());
  }
  if (arr1.length > 0) sorted.push(...arr1);
  if (arr2.length > 0) sorted.push(...arr2);
  return sorted;
}

function split(arr) {
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const [arr1, arr2] = split(arr);
  return merge(mergeSort(arr1), mergeSort(arr2));
}

const sorted = mergeSort(removeDuplicates(arr));
```

Split the array to build the tree:

```javascript
function buildTree(arr) {
  if (arr.length < 1) {
    return null;
  }
  const mid = parseInt(arr.length / 2);
  const node = createNode(arr[mid]);
  node.setLeftNode(buildTree(arr.slice(0, mid)));
  node.setRightNode(buildTree(arr.slice(mid + 1)));
  return node;
}

let root = buildTree(sorted);
```

### Breadth-first Traversal

The trick here is to use a queue to store the left and right nodes (if present) before moving down a level:

```javascript
levelOrder(callback) {
  if (root === null) {
    return;
  }

  const values = [];
  const queue = [];

  queue.push(root);

  while (queue.length > 0) {
    const node = queue.shift();

    if (callback) {
      callback(node);
    }

    if (!callback) {
      values.push(node.getValue());
    }

    if (node.getLeftNode() !== null) {
      queue.push(node.getLeftNode());
    }

    if (node.getRightNode() !== null) {
      queue.push(node.getRightNode());
    }
  }

  return values;
}
```

### Depth-first Traversal

Recursion is helpful for all versions (inorder, preorder, postorder). I am not sure about declaring an array if a callback is provided:

```javascript
inorder(callback) {
  const values = [];

  function inorderRec(node) {
    if (node === null) {
      return;
    }

    // Change the order of these three lines for preorder and postorder
    inorderRec(node.getLeftNode());
    callback ? callback(node) : values.push(node.getValue());
    inorderRec(node.getRightNode());
  }

  inorderRec(root);
  return values;
}
```

### Calculating Height

Got into a little trouble here... recursion is used but remember to add 1 to the return value:

```javascript
height(node = root) {
  if (node === null) {
    return 0;
  }

  return (
    Math.max(
      this.height(node.getLeftNode()),
      this.height(node.getRightNode())
    ) + 1
  );
},
```

### Calculating Depth

Using recursion with a default parameter value for the input node so when no node is provided, it defaults to the root:

```javascript
depth(value, node = root) {
  if (node === null) {
    return -1;
  }

  let dist = -1;

  if (
    node.getValue() === value ||
    (dist = this.depth(value, node.getLeftNode())) >= 0 ||
    (dist = this.depth(value, node.getRightNode())) >= 0
  ) {
    return dist + 1;
  }

  return dist;
}
```

### Checking for Balance

Using the height method inside this recursion method...

```javascript
isBalanced(node = root) {
  if (node === null) {
    return true;
  }

  return (
    Math.abs(
      this.height(node.getLeftNode()) - this.height(node.getRightNode())
    ) <= 1 &&
    this.isBalanced(node.getLeftNode()) &&
    this.isBalanced(node.getRightNode())
  );
}
```

### Rebalancing

Here are some pseudo code ideas for the rebalance method:

```
rebalance() {
  inOrderArray = tree.inorder();
  newTree = buildTree(inOrderArray);
  root = newTree.getRoot()
}
```

I think this will take care of everything... but we shall see.

Ok, close... here is the actual code (refactored):

```javascript
rebalance() {
  root = buildTree(this.inorder());
}
```

We also had to change the getRootMethod and the prettyPrintMethod so they no longer took root as an argument. That way we can adjust the root of the tree after rebalancing.
