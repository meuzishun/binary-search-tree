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
