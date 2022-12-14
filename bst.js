#!/usr/bin/env node

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree = (array) => {
    let uniqueArray = array
    .filter((numb, index, arr) => {
      return arr.indexOf(numb) === index;
    })
    .sort((a, b) => a - b);

    const populate = (arr) => {
      if (arr.length === 1) return new Node(arr[0]);
      let mid = Math.floor(arr.length / 2);
      let node = new Node(arr[mid]);

      if (arr.length === 2) {
        node.left = populate(arr.slice(0, mid));
        return node;
      }
      node.left = populate(arr.slice(0, mid));
      node.right = populate(arr.slice(mid+1));
      return node;
    }
    this.root = populate(uniqueArray);
    return this.root;
  }

  insertRec = (value, node) => {
    if (!node) {
      node = new Node(value);
      return node;
    }
    if (value < node.data) {
      node.left = this.insertRec(value, node.left);
    } else if (value >= node.data) {
      node.right = this.insertRec(value, node.right);
    }
    return node;
  }

  insert = (value) => this.insertRec(value, this.root);

  searchRec = (value, node = this.root) => {
    if (!node || node.data === value) return node;
    else if (value < node.data) return this.searchRec(value, node.left);
    else if (value > node.data) return this.searchRec(value, node.right);
  }
  
  //search = (value) => this.searchRec(value, this.root);

  deleteRec = (value, node) => {
    if (!node) return null;
    else if (value < node.data) node.left = this.deleteRec(value, node.left);
    else if (value > node.data) node.right = this.deleteRec(value, node.right);
    else if (value === node.data) {
      if (!node.left && !node.right) node = null;
      else if (node.left && !node.right) node = node.left;
      else if (!node.left && node.right) node = node.right;
      else if (node.left && node.right) {
        let inOrderSuccesor = node.right;
        while (inOrderSuccesor.left) {
          inOrderSuccesor = inOrderSuccesor.left;
        }
        this.delete(inOrderSuccesor.data);
        node.data = inOrderSuccesor.data;
        return node;
      }
    }
    return node;
  }

  delete = (value) => this.root = this.deleteRec(value, this.root); 

  levelOrderRec = (cb, accu, queue) => {
    if (queue.length === 0) return accu;
    let node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    let recAccu = cb(node, accu)
    accu = this.levelOrderRec(cb, recAccu, queue);
    return accu;
  }

  levelOrderIt = (cb, accu, queue) => {
    let node;
    while (queue.length) {
      node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      accu = cb(node, accu)
    }
    return accu;
  }

  preOrder = (cb, accu, node) => {
    if (!node) return accu;
    accu = cb(node, accu);
    if (node.left) accu = this.preOrder(cb, accu, node.left);
    if (node.right) accu = this.preOrder(cb, accu, node.right);
    return accu;
  }

  inOrder = (cb, accu, node) => {
    if (!node) return accu;
    if (node.left) accu = this.inOrder(cb, accu, node.left);
    accu = cb(node, accu);
    if (node.right) accu = this.inOrder(cb, accu, node.right);
    return accu;
  }

  postOrder = (cb, accu, node) => {
    if (!node) return accu;
    if (node.left) accu = this.postOrder(cb, accu, node.left);
    if (node.right) accu = this.postOrder(cb, accu, node.right);
    accu = cb(node, accu);
    return accu;
  }

  traverse = (
    order = 'levelRec',
    cb = (node, accu) => {
      accu = [...accu, node.data];
      return accu;
    },
    accu = []
  ) => {
    let result;
    switch (order) {
      case 'levelRec':
        result = this.levelOrderRec(cb, accu, [this.root]);
        break;
      case 'levelIt':
        result = this.levelOrderIt(cb, accu, [this.root]);
        break;
      case 'preorder':
        result = this.preOrder(cb, accu, this.root);
        break;
      case 'inorder':
        result = this.inOrder(cb, accu, this.root);
        break;
      case 'postorder':
        result = this.postOrder(cb, accu, this.root);
        break;
      default:
        console.log('Please choose levelRec, levelIt, preorder, inorder or postorder');
    }
  return result;
  }
  
  height = (node) => {
    if (!node) {
      console.log('Please enter a valid node');
      return;
    }
    let h = 0;
    let queue = [{node, h: 0}];
    while (queue.length) {
      let lvl = queue.shift();
      h = lvl.h;
      if (lvl.node.left) queue.push({node: lvl.node.left, h: h + 1})
      if (lvl.node.right) queue.push({node: lvl.node.right, h: h + 1})  
    }
    return h;
  }

  depthRec = (targetNode, root = this.root, d = 0) => {
    if (!root || root === targetNode) return d;
    if (targetNode.data > root.data) return this.depthRec(targetNode, root.right, d + 1);
    if (targetNode.data < root.data) return this.depthRec(targetNode, root.left, d + 1);
  }

  isBalanced = (root) => {
    let balanceArray = this.levelOrderRec(
      (node, accu) => {
        let leftHeight = node.left ? this.height(node.left) : 0;
        let rightHeight = node.right ? this.height(node.right) : 0;
        accu.push(leftHeight - rightHeight < 2 && rightHeight - leftHeight < 2)
        return accu;
      }, 
      [], 
      [this.root]
    )
    return balanceArray.every(value => value);
  }

  rebalance = () => {
    let arr = bst.traverse();
    this.buildTree(arr);
  }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (!node) {
    console.log(null);
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
  }
}

const randArray = (n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(Math.floor(Math.random() * 100));
  }
  return result;
}

const bst = new Tree();
let array = randArray(50);
bst.buildTree(array);
console.log(bst.isBalanced());
console.log(bst.traverse());
console.log(bst.traverse('preorder'));
console.log(bst.traverse('inorder'));
console.log(bst.traverse('postorder'));

for (let i = 0; i < 100; i++) {
  bst.insert(Math.floor(Math.random() * 100))
}
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.rebalance();
console.log(bst.isBalanced());

console.log(bst.traverse());
console.log(bst.traverse('preorder'));
console.log(bst.traverse('inorder'));
console.log(bst.traverse('postorder'));
