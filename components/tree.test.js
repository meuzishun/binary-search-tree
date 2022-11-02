import { createTree } from './tree.js';

test('Calling createTree returns as object', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(typeof testTree).toBe('object');
});

test('Tree has correct root node', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(testTree.getRoot().getValue()).toBe(8);
});

//* find method tests
test('Tree has a find method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.find(23);
  }).not.toThrow();
});

test('The find method returns null when value is not present', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const foundNode = testTree.find(21);
  expect(foundNode).toBe(null);
});

test('The find method does not return null when value is present', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const foundNode = testTree.find(23);
  expect(foundNode).not.toBe(null);
});

test('The find method returns the node with the searched value if present', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const foundNode = testTree.find(23);
  expect(foundNode.getValue()).toBe(23);
});

//* insert method tests
test('Tree has an insert method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.insert();
  }).not.toThrow();
});

test('Insert method can add a node to the tree', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  testTree.insert(21);
  expect(testTree.find(21)).not.toBe(null);
});

test('Insert method can add a node with the correct value to the tree', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  testTree.insert(21);
  expect(testTree.find(21).getValue()).toBe(21);
});

test('Inserting a value that is already present does not throw an error', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.insert(23);
  }).not.toThrow();
});

//* delete method tests
test('Tree has a deleteValue method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.deleteValue();
  }).not.toThrow();
});

test('delete method causes find method to return null', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  testTree.deleteValue(23);
  const node = testTree.find(23);
  expect(node).toBe(null);
});

test('deleted node is replaced by the appropriate node', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  testTree.deleteValue(4);
  expect(testTree.getRoot().getLeftNode().getValue()).toBe(5);
});

test('deleted node has the same left child as replacing node', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const fourNode = testTree.find(4);
  const leftNodeValue = fourNode.getLeftNode().getValue();
  testTree.deleteValue(4);
  const newNode = testTree.getRoot().getLeftNode();
  expect(newNode.getLeftNode().getValue() === leftNodeValue).toBeTruthy();
});

test('deleted node has the same right child as replacing node', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const fourNode = testTree.find(4);
  const rightNodeValue = fourNode.getRightNode().getValue();
  testTree.deleteValue(4);
  const newNode = testTree.getRoot().getLeftNode();
  expect(newNode.getRightNode().getValue() === rightNodeValue).toBeTruthy();
});

//* levelOrder tests
test('Tree has a levelOrder method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.levelOrder();
  }).not.toThrow();
});

test('levelOrder returns breadth-first order to array when no callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const breadth = testTree.levelOrder();
  expect(breadth.toString()).toBe('8,4,67,3,7,23,6345,1,5,9,324');
});

test('levelOrder calls function on each node in breadth-first order when callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const breadth = [];
  function pushToArray(node) {
    breadth.push(node.getValue());
  }
  testTree.levelOrder(pushToArray);
  expect(breadth.toString()).toBe('8,4,67,3,7,23,6345,1,5,9,324');
});

//* inorder tests
test('Tree has a inorder method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.inorder();
  }).not.toThrow();
});

test('inorder returns depth-first order to array when no callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = testTree.inorder();
  expect(depth.toString()).toBe('1,3,4,5,7,8,9,23,67,324,6345');
});

test('inorder calls function on each node in depth-first order when callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = [];
  function pushToArray(node) {
    depth.push(node.getValue());
  }
  testTree.inorder(pushToArray);
  expect(depth.toString()).toBe('1,3,4,5,7,8,9,23,67,324,6345');
});

//* preorder tests
test('Tree has a preorder method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.preorder();
  }).not.toThrow();
});

test('preorder returns depth-first order to array when no callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = testTree.preorder();
  expect(depth.toString()).toBe('8,4,3,1,7,5,67,23,9,6345,324');
});

test('preorder calls function on each node in depth-first order when callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = [];
  function pushToArray(node) {
    depth.push(node.getValue());
  }
  testTree.preorder(pushToArray);
  expect(depth.toString()).toBe('8,4,3,1,7,5,67,23,9,6345,324');
});

//* postorder tests
test('Tree has a postorder method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.postorder();
  }).not.toThrow();
});

test('postorder returns depth-first order to array when no callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = testTree.postorder();
  expect(depth.toString()).toBe('1,3,5,7,4,9,23,324,6345,67,8');
});

test('postorder calls function on each node in depth-first order when callback is specified', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const depth = [];
  function pushToArray(node) {
    depth.push(node.getValue());
  }
  testTree.postorder(pushToArray);
  expect(depth.toString()).toBe('1,3,5,7,4,9,23,324,6345,67,8');
});

//* height tests
test('Tree has a height method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.height();
  }).not.toThrow();
});

test('Calling the height method on a tree returns the correct value', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(testTree.height()).toBe(3);
});

test('Inserting nodes that change the height alter the return value of height', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(testTree.height()).toBe(3);
  testTree.insert(111);
  testTree.insert(114);
  testTree.insert(124);
  testTree.insert(127);
  expect(testTree.height()).toBe(7);
});

test('Checking for height of a node other than the root return correct value', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  const three = testTree.find(3);
  expect(testTree.height(three)).toBe(1);
});
