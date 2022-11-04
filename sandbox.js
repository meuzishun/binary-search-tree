import { createTree } from './components/tree.js';

function randomArray(len) {
  const arr = [];
  while (arr.length < len) {
    const randNum = Math.floor(Math.random() * 100);
    if (arr.includes(randNum)) continue;
    arr.push(randNum);
  }
  return arr.sort((a, b) => a - b);
}

console.group();
console.log('=====================================================');
const testTree = createTree(randomArray(20));
testTree.prettyPrint();
console.assert(testTree.isBalanced(), 'Tree is not balanced');
console.log('Pre-order: ', testTree.preorder());
console.log('Post-order: ', testTree.postorder());
console.log('In-order: ', testTree.inorder());
console.groupEnd();

console.group();
console.log('=====================================================');
testTree.insert(101);
testTree.insert(201);
testTree.insert(301);
testTree.prettyPrint();
console.assert(!testTree.isBalanced(), 'Tree is balanced');
console.groupEnd();

console.group();
console.log('=====================================================');
testTree.rebalance();
testTree.prettyPrint();
console.assert(testTree.isBalanced(), 'Tree is not balanced');
console.log('Pre-order: ', testTree.preorder());
console.log('Post-order: ', testTree.postorder());
console.log('In-order: ', testTree.inorder());
console.groupEnd();
