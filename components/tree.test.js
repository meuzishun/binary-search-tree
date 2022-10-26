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
