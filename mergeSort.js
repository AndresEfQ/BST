#!/usr/bin/env node

const merge = (left, right) => {
  let i = 0;
  let j = 0;
  let result = [];

  while (i < left.length || j < right.length) {
    if (left[i] < right[j] || j === right.length) {
      result.push(left[i]);
      i++;
    } else if (right[j] < left[i] || i === left.length) {
      result.push(right[j]);
      j++;
    }
  }
  return result;
}

const mergeSort = (arr) => {
  if (arr.length === 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  let result = merge(left, right);
  return result;
}

console.log(mergeSort([1,0]));
console.log(mergeSort([1,0,6,5,4,3,2,9,8,7]));
console.log(mergeSort([1,0]));
console.log(mergeSort([1,0]));