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
      find(value, node = root) {
        if (node === null || node.getValue() === value) {
          return node;
        }

        if (node.getValue() < value) {
          return this.find(value, node.getRightNode());
        }

        return this.find(value, node.getLeftNode());
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

  function deleteMethod() {
    return {
      deleteValue(value) {
        root = deleteRec(value, root);
      },
    };
  }

  function minValue(node) {
    let minv = node.getValue();
    while (node.getLeftNode() !== null) {
      minv = node.getLeftNode().getValue();
      node = node.getLeftNode();
    }
    return minv;
  }

  function deleteRec(value, node) {
    if (node === null) {
      return node;
    }

    if (value < node.getValue()) {
      node.setLeftNode(deleteRec(value, node.getLeftNode()));
    }

    if (value > node.getValue()) {
      node.setRightNode(deleteRec(value, node.getRightNode()));
    }

    if (value === node.getValue()) {
      if (node.getLeftNode() === null) {
        return node.getRightNode();
      }

      if (node.getRightNode() === null) {
        return node.getLeftNode();
      }

      node.setValue(minValue(node.getRightNode()));
      node
        .getRightNode()
        .setValue(deleteRec(node.getValue(), node.getRightNode()).getValue());
    }

    return node;
  }

  function levelOrderMethod() {
    return {
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
      },
    };
  }

  function inorderMethod() {
    return {
      inorder(callback) {
        const values = [];

        function inorderRec(node) {
          if (node === null) {
            return;
          }
          inorderRec(node.getLeftNode());
          callback ? callback(node) : values.push(node.getValue());
          inorderRec(node.getRightNode());
        }

        inorderRec(root);
        return values;
      },
    };
  }

  function preorderMethod() {
    return {
      preorder(callback) {
        const values = [];

        function preorderRec(node) {
          if (node === null) {
            return;
          }
          callback ? callback(node) : values.push(node.getValue());
          preorderRec(node.getLeftNode());
          preorderRec(node.getRightNode());
        }

        preorderRec(root);
        return values;
      },
    };
  }

  function postorderMethod() {
    return {
      postorder(callback) {
        const values = [];

        function postorderRec(node) {
          if (node === null) {
            return;
          }
          postorderRec(node.getLeftNode());
          postorderRec(node.getRightNode());
          callback ? callback(node) : values.push(node.getValue());
        }

        postorderRec(root);
        return values;
      },
    };
  }

  function heightMethod() {
    return {
      height(node = root) {
        if (node === null) {
          return -1;
        }

        return (
          Math.max(
            this.height(node.getLeftNode()),
            this.height(node.getRightNode())
          ) + 1
        );
      },
    };
  }

  function depthMethod() {
    return {
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
      },
    };
  }

  function isBalancedMethod() {
    return {
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
      },
    };
  }

  return Object.freeze(
    Object.assign(
      {},
      getRootMethod(root),
      prettyPrintMethod(root),
      findMethod(),
      insertMethod(),
      deleteMethod(),
      levelOrderMethod(),
      inorderMethod(),
      preorderMethod(),
      postorderMethod(),
      heightMethod(),
      depthMethod(),
      isBalancedMethod()
    )
  );
}
