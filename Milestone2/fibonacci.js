let x = 90;
let y;

fibonnacci(x);

document.getElementById(`x`).innerText = x;
document.getElementById("y").innerText = y;

function fibonnacci(x) {
  let startingValue = 1;
  let prev1 = 0;
  let prev2 = 1;
  if (x === startingValue) {
    return (y = 1);
  } else {
    while (startingValue < x) {
      let sum = prev1 + prev2;
      y = sum; //asign y to be sum of two previous values
      prev1 = prev2; // reassign most recent prev value as 2nd prev value
      prev2 = y; //reassign 2 prev value as our new y, so y now enters the list as a prev value
      startingValue++; //increment operator to go to next step in sequence, F1-> F2 -> F3 etc.
    }
  }
  console.log(y);
  return y;
}
