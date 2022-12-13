let xArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let yArray = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

let x = 1;

let xIndex = xArray.indexOf(x);
console.log(xIndex);

let yIndex = xIndex;

let y = yArray[yIndex];

document.getElementById(`x`).innerText = x;
document.getElementById('y').innerText = y;



