#!/usr/bin/env node

const moves = [
  [-2, -1],  
  [-1, -2],  
  [-2, 1],  
  [1, -2],  
  [-1, 2],  
  [2, -1],  
  [1, 2],  
  [2, 1]
]

const knightMoves = (start, end) => {
  let [xi, yi] = start;
  let [xf, yf] = end;
  if (xi === xf && yi === yf) {
    console.log('Your knight is already at it\'s destination!');
    return;
  }
  if (xi < 0 || yi < 0 || xf < 0 || yf < 0 || 
      xi > 7 || yi > 7 || xf > 7 || yf > 7) {
      console.log('Your knight can\'t walk outside the board');
      return;
    }
  let queue = [{cell: start, path: []}];
  let step
  while (xi !== xf || yi !== yf) {
    step = queue.shift();
    [xi, yi] = step.cell;
    moves.forEach((move) => {
      let [xm, ym] = move;
      if (xi + xm >= 0 && yi + ym >= 0 && 
          xi + xm < 8 && yi + ym < 8) {
        queue.push({cell: [xi + xm, yi + ym], path: [...step.path, step.cell]})
      }
    })
  }
  console.log(`=> You made it in ${step.path.length} moves! Here's your path:`);
  for (let i = 0; i < step.path.length; i++) {
    console.log(step.path[i]);
  };
  console.log(step.cell);
}

knightMoves([0,0], [3,4]);