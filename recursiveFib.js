#!/usr/bin/env node

const fibsRec = (n) => (n === 1 ? [0] : n === 2 ? [0, 1] : [...fibsRec(n - 1), (fibsRec(n - 1)[n - 2] + fibsRec(n - 1)[n - 3])]);

const fibs = (n) => {
  let ans = [];
  let prev = 0;
  let curr = 1;
  let temp;
  for (let i = 0; i < n; i++) {
      if (i === 0) ans.push(prev);
      else if (i === 1) ans.push(curr);
      else {
          temp = curr;
          curr = curr + prev;
          prev = temp;
          ans.push(curr);
      }
  }
  return ans;
}

console.log(fibsRec(1));
console.log(fibsRec(2));
console.log(fibsRec(3));
console.log(fibsRec(4));
console.log(fibsRec(5));
console.log(fibsRec(6));
console.log(fibsRec(7));
console.log(fibsRec(8));