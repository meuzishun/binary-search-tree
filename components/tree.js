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

  function buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const node = createNode(arr[mid]);
    node.setLeftNode(buildTree(arr, start, mid - 1));
    node.setRightNode(buildTree(arr, mid + 1, end));
    return node;
  }

  let root = buildTree(sorted, 0, sorted.length - 1);

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

  return Object.freeze(
    Object.assign({}, getRootMethod(root), prettyPrintMethod(root))
  );
}
