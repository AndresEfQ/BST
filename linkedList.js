#!/usr/bin/env node

const Node = function (value) {
  this.value = value;
  this.next = null;
}

const LinkedList = function () {
  this.head = null;
  this.size = 0;

  this.checkEmpty = () => {
    if (!this.head) {
      console.log('The list is empty');
    }
    return !Boolean(this.head);
  }

  this.append = (value) => {
    if (!this.head) {
      this.head = new Node(value);
      this.size++;
      return;
    }
    let current = this.head
    while (current.next) {
      current = current.next;
    }
    current.next = new Node(value);
    this.size++;
    return;
  }

  this.preppend = (value) => {
    let prevHead = this.head;
    this.head = new Node(value);
    this.head.next = prevHead;
    this.size++;
    return;
  }

  this.tailVal = () => {
    if (this.checkEmpty()) return;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current.value;
  }

  this.headVal = () => {
    if (this.checkEmpty()) return;
    return this.head.value;
  }

  this.at = (index) => {
    if (this.checkEmpty()) return;
    if (index >= this.size || index < 0) {
      console.log('Index out of bounds');
      return
    }
    let counter = 0;
    let current = this.head;
    while (counter < index) {
      current = current.next;
      counter++;
    }
    return current.value;
  }

  this.pop = () => {
    if (this.checkEmpty()) return;
    let current = this.head;
    let prev;
    while (current.next) {
      prev = current;
      current = current.next;
    }
    prev.next = null;
    this.size--
    return current.value;
  }

  this.contains = (value) => {
    if (this.checkEmpty()) return;
    let current = this.head;
    if (current.value === value) return true;
    while (current.next) {
      current = current.next;
      if (current.value === value) return true;
    }
    return false;
  }

  this.find = (value) => {
    if (this.checkEmpty()) return;
    let index = 0;
    let current = this.head;
    if (current.value === value) return index;
    while (current.next) {
      current = current.next;
      index++;
      if (current.value === value) return index;
    }
    return null;
  }

  this.toString = () => {
    let result = [];
    if (!this.head) {
      result = 'null'
    }
    let current = this.head;
    result.push(`( ${current.value} ) -> `);
    while (current.next) {
      current = current.next;
      result.push(`( ${current.value} ) -> `)
    }
    result.push('null');
    return result.join('');
  }

  this.insertAt = (value, index) => {
    if (index >= this.size || index < 0) {
      console.log('Index out of bounds');
      return
    }
    let counter = 0;
    let current = this.head;
    let prev;
    while (counter < index) {
      prev = current;
      current = current.next;
      counter++;
    }
    let insertedNode = new Node(value);
    prev.next = insertedNode;
    insertedNode.next = current;
 
  }
  this.removeAt = (index) => {
    if (index >= this.size || index < 0) {
      console.log('Index out of bounds');
      return
    }
    let counter = 0;
    let current = this.head;
    let prev;
    while (counter < index) {
      prev = current;
      current = current.next;
      counter++;
    }
    prev.next = current.next;
  }
}

const list = new LinkedList();
console.log(list.tailVal());
list.append(5);
list.append(3);
list.append(7);
list.preppend(8);
list.preppend(2);
console.log(list.size);
console.log(list.tailVal());
console.log(list.headVal());
console.log(list.at(3));
console.log(list.at(0));
console.log(list.at(7));
console.log(list.contains(7));
console.log(list.find(7));
/* console.log(list.pop()); */
console.log(list.size);
console.log(list.tailVal());
console.log(list.contains(7));
console.log(list.contains('a'));
console.log(list.find(5));
console.log(list.find(8));
console.log(list.find(18));
console.log(list.toString());
list.insertAt(2,4);
console.log(list.toString());
list.insertAt(15,2);
console.log(list.toString());
list.removeAt(2);
console.log(list.toString());
