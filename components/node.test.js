import { createNode } from './node.js';

test('Calling createNode returns an object', () => {
  expect(typeof createNode('value')).toBe('object');
});

//* Test properties exist
test('createNode returns an object with a getValue property', () => {
  expect(createNode('value')).toHaveProperty('getValue');
});

test('createNode should return an object with a getLeftNode property', () => {
  expect(createNode('value')).toHaveProperty('getLeftNode');
});

test('createNode should return an object with a getRightNode property', () => {
  expect(createNode('value')).toHaveProperty('getRightNode');
});

test('createNode returns an object with a setValue property', () => {
  expect(createNode('value')).toHaveProperty('setValue');
});

test('createNode should return an object with a setLeftNode property', () => {
  expect(createNode('value')).toHaveProperty('setLeftNode');
});

test('createNode should return an object with a setRightNode property', () => {
  expect(createNode('value')).toHaveProperty('setRightNode');
});

//* Test properties return correct value
test('createNode.getValue returns the correct value', () => {
  const test = createNode('My awesome node');
  expect(test.getValue()).toBe('My awesome node');
});

test('setValue can change the value', () => {
  const test = createNode('test');
  test.setValue('test2');
  expect(test.getValue()).toBe('test2');
});

test('the leftNode is initially null', () => {
  const test = createNode('test');
  expect(test.getLeftNode()).toBe(null);
});

test('setLeftNode can change the leftNode value', () => {
  const test = createNode('test');
  test.setLeftNode('my lefty');
  expect(test.getLeftNode()).toBe('my lefty');
});

test('the rightNode is initially null', () => {
  const test = createNode('test');
  expect(test.getRightNode()).toBe(null);
});

test('setRightNode can change the rightNode value', () => {
  const test = createNode('test');
  test.setRightNode('my right hand man');
  expect(test.getRightNode()).toBe('my right hand man');
});
