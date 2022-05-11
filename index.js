/* YOUR CODE HERE! */
// /* YOUR CODE HERE! */

let box_numbers = [1];
let box = document.querySelector(".box");
let boxContainer = document.querySelector(".box-container");
let size = "small";
let count = 2;
let boxAmount = 1;

function generateBoxNumber() {
    let maxVal = Math.max(...box_numbers) + 1;
    box_numbers.push(maxVal);
    return maxVal.toString();
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

function rightClickHandler(event) {
    event.preventDefault();
    event.target.style.background = generateRandomColor();
}

const clickHandler = (container) => {
  container.addEventListener("click", (event) => {
    if (event.shiftKey) {
      if (size === "small") {
        container.classList.add("box-large");
        size = "large";
      } else {
        container.classList.remove("box-large");
        size = "small";
      }
    }
  });
};

const moveHandler = (container) => {
  container.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", followCursor);

    function followCursor(event) {
      container.style.left = event.clientX - container.clientHeight / 2 + "px";
      container.style.top = event.clientY - container.clientWidth / 2 + "px";
    }
    
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", followCursor);
    });
  });
};

const leftClickHandler = (container) => {
  container.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    color = generateRandomColor();
    container.style.backgroundColor = color;
  });
};

const doubleClickHandler = (container) => {
  container.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (!event.shiftKey && !event.altKey) {
      let newElemnt = document.createElement("div");
      newElemnt.classList.add("box");
      newElemnt.textContent = count;
      newElemnt.style.left =
        container.offsetLeft + container.clientHeight + "px";
      newElemnt.style.top = container.offsetTop + container.clientWidth + "px";
      leftClickHandler(newElemnt);
      moveHandler(newElemnt);
      clickHandler(newElemnt);
      doubleClickHandler(newElemnt);
      boxContainer.appendChild(newElemnt);
      count += 1;
      boxAmount += 1;
    }
    if (event.altKey && boxAmount > 1) {
      boxContainer.removeChild(container);
      boxAmount -= 1;
    }
  });
};

leftClickHandler(box);
moveHandler(box);
clickHandler(box);
doubleClickHandler(box);