import { createTree } from './components/tree.js';

export function add(num1, num2) {
  return num1 + num2;
}

// const testTree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(testTree.getRoot().getValue());
// testTree.prettyPrint();
// console.assert(testTree.isBalanced(), 'Tree is not balanced');
// const three = testTree.find(3);
// console.log(testTree.height(three));
// testTree.height();
// testTree.insert(111);
// testTree.insert(114);
// testTree.insert(124);
// console.log(testTree.getRoot().getValue());
// testTree.prettyPrint();
// console.assert(!testTree.isBalanced(), 'Tree is balanced');
// testTree.rebalance();
// console.assert(testTree.isBalanced(), 'Tree is not balanced');
// console.log(testTree.getRoot().getValue());
// testTree.prettyPrint(testTree.getRoot());

// testTree.insert(127);
// testTree.prettyPrint();
// console.log(testTree.inorder());
// function log(node) {
//   console.log(node.getValue());
// }
// testTree.levelOrder(log);
// testTree.deleteValue(4);
// console.log('');
// console.log('==============================================');
// console.log('');
// testTree.prettyPrint();
// console.log(testTree.getRoot().getLeftNode().getRightNode().getValue());
