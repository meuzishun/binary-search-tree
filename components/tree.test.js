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

test('Tree has an insert method', () => {
  const testTree = createTree([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
  ]);
  expect(() => {
    testTree.insert();
  }).not.toThrow();
});

test('', () => {});
