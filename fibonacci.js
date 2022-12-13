let button = document.getElementById("button");
let spinner = document.getElementById("spinner");
let resultsSpinner = document.getElementById("resultsSpinner");
let errorAlert = document.getElementById("error");
let input = document.getElementById("number");
let container = document.getElementById("container");
let body = document.getElementById("body");

//regular getResults

/*function getResults() {
  resultsSpinner.style.display = "block";
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {
      createList(sortByDate(data.results), "resultsContainer");
    });
}*/

//async/await getResults

async function getResults() {
  resultsSpinner.style.display = "block";
  let response = await fetch(`http://localhost:5050/getFibonacciResults`);
  let responseObject = await response.json();
  let data = await createList(
    sortByDate(responseObject.results),
    "resultsContainer"
  );
  return data;
}

function createList(resultsList, divContainer) {
  let newList = document.createElement("ul");
  newList.classList.add("resultsUl");
  for (let item of resultsList) {
    let listItem = document.createElement("li");
    listItem.classList.add("resultsLi");
    let itemDate = new Date(item.createdDate);

    //manually control date
    /*itemDate.set;
    let printDay = new Intl.DateTimeFormat("en-IS", {
      weekday: "short",
    }).format(itemDate);
    let printDate = new Intl.DateTimeFormat("en-IS", {
      month: "short",
      day: "numeric",
    }).format(itemDate);
    let printYear = new Intl.DateTimeFormat("en-IS", {
      year: "numeric",
    }).format(itemDate);
    let printTime = new Intl.DateTimeFormat("en-IS", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      millisecond: "numeric",
      timeZoneName: "longOffset",
      hour12: false,
    }).format(itemDate);
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    listItem.innerHTML = `The Fibonacci of <b>${item.number}</b> is <b>${item.result}</b>. Calculated at: ${printDay} ${printDate} ${printYear} ${printTime}(${timeZone})`; */

    listItem.innerHTML = `The Fibonacci of <b>${item.number}</b> is <b>${
      item.result
    }</b>. Calculated at: ${itemDate.toString()}`;
    newList.appendChild(listItem);
  }
  resultsContainer.innerHTML = "";
  resultsSpinner.style.display = "none";
  document.getElementById(divContainer).appendChild(newList);
}

function sortByDate(results) {
  return results.sort((a, b) => {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    if (b.createdDate < a.createdDate) {
      return -1;
    }
    if (b.createdDate === createdDate) {
      return 0;
    }
  });
}

function printNumber(y) {
  let answer = document.getElementById("answer");
  answer.innerText = y;
}

function checkError(response) {
  // if (response.status >= 200 && response.status <= 299) {
  if (response.ok) {
    //good thing, no bad errors!
    return response.json(); //converts to object from json
  } else {
    return response.text().then((text) => {
      throw new Error(text);
    });
  }
}

function getNumber(x) {
  fetch(`http://localhost:5050/fibonacci/${x}`)
    .then(checkError)
    //.then((response) => response.json())
    .then((data) => {
      //takes a response and parses to js object
      //console.log(data);
      y = data.result;
      spinner.style.display = "none";
      answer.classList.remove("errorText");
      printNumber(y);
    })
    .catch((error) => {
      //console.log(error);
      spinner.style.display = "none";
      answer.classList.add("errorText");
      printNumber(error);
    });
}

function fibonacci(x) {
  let startingValue = 1;
  let prev1 = 0;
  let prev2 = 1;

  if (x == startingValue) {
    y = 1;
    printNumber(y);
  } else {
    while (startingValue < x) {
      let sum = prev1 + prev2;
      y = sum;
      prev1 = prev2;
      prev2 = y;
      startingValue++;
    }
    printNumber(y);
  }
}

input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    button.click();
  }
});

window.onload = getResults;

button.addEventListener("click", clickFunction);

async function clickFunction(event) {
  event.preventDefault();
  let x = input.value;
  printNumber(""); //clears text

  if (x > 50) {
    //too high value error
    container.classList.add("flex-parent-error");
    error.style.display = "block";
    input.style.border = "solid 1px #D9534F";
    input.style.color = "#D9534F";
  } else {
    //input good, go fetch or run locally!
    container.classList.remove("flex-parent-error");
    error.style.display = "none";
    input.style.border = "1pt solid #cccccc";
    input.style.color = "#373A3C";

    if (document.getElementById("flexCheckDefault").checked) {
      console.log(document.getElementById("flexCheckDefault").checked);
      spinner.style.display = "inline";
      await getNumber(x);
      await getResults();
    } else {
      spinner.style.display = "none";
      fibonacci(x);
    }
  }
}
