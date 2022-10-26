import { createNode } from './node.js';

export function createTree(arr) {
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

  function getRootMethod(root) {
    return {
      getRoot() {
        return root;
      },
    };
  }

  function prettyPrintMethod(root) {
    return {
      prettyPrint(node = root, prefix = '', isLeft = true) {
        if (node.getRightNode() !== null) {
          this.prettyPrint(
            node.getRightNode(),
            `${prefix}${isLeft ? '│   ' : '    '}`,
            false
          );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
        if (node.getLeftNode() !== null) {
          this.prettyPrint(
            node.getLeftNode(),
            `${prefix}${isLeft ? '    ' : '│   '}`,
            true
          );
        }
      },
    };
  }

  function findMethod() {
    return {
      find(node, value) {
        if (node === null || node.getValue() === value) {
          return node;
        }

        if (node.getValue() < value) {
          return this.find(node.getRightNode(), value);
        }

        return this.find(node.getLeftNode(), value);
      },
    };
  }

  function insertMethod() {
    return {
      insert(value, node = root) {
        if (node === null) {
          return createNode(value);
        }

        if (value < node.getValue()) {
          node.setLeftNode(this.insert(value, node.getLeftNode()));
        } else if (value > node.getValue()) {
          node.setRightNode(this.insert(value, node.getRightNode()));
        }

        return node;
      },
    };
  }

  return Object.freeze(
    Object.assign(
      {},
      getRootMethod(root),
      prettyPrintMethod(root),
      findMethod(),
      insertMethod()
    )
  );
}
