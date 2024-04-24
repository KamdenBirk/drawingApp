const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = Number(document.getElementById('size').textContent);
let isPressed = false;
let color = document.getElementById('color').value;
let x;
let y;
let transparency = document.getElementById('transparent').value;

canvas.addEventListener('mousedown', (e) => {//checks for mouse being held down and sets isPressed to true which will be used later to draw
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
})

document.addEventListener('mouseup', () => {//fixed issue with dragging off canvas and letting go of mouse and coming back
    isPressed = false;

    x = undefined;
    y = undefined;
})

canvas.addEventListener('mouseup', () => { //changes isPressed to false so that it won't draw when mouse isn't held down
    isPressed = false;

    x = undefined;
    y = undefined;
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {// only draws if mouse is held down
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        if (e.shiftKey) { // if the shift key is pressed and the mouse is pressed it will run the erase functions
            eraseCircle(x2, y2);
            eraseLine(x, y, x2, y2);
            x=x2;
            y=y2;
        } else { // if the mouse is pressed and the shift key is not, it will run the draw functions
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x=x2;
        y=y2;
        }
    }
})

function drawCircle(x, y) { // uses location of mouse and draws a circle the color and size that is selected there
    ctx.beginPath();
    transparency = document.getElementById('transparent').value;
    ctx.globalAlpha = transparency;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    color = document.getElementById('color').value;
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) { // follows the movement of the mouse to draw lines
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    transparency = document.getElementById('transparent').value;
    ctx.globalAlpha = transparency;
    color = document.getElementById('color').value;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

const minus = document.getElementById('decrease');

minus.onclick = decrementSize;// when the "-1" button is clicked it lowers the size value for the cursor's drawing and erasing by one

function decrementSize() {
    size -= 1;
    document.getElementById('size').textContent = size;
    if(document.getElementById('size').textContent <= 0) {
        document.getElementById('size').textContent = 1;
        size = 1;
    }
}


const add = document.getElementById('increase');

add.onclick = incrementSize; // when the "+1" button is clicked it raises the size value for the cursor's drawing and erasing by one

function incrementSize() {
    size += 1;
    if(document.getElementById('size').textContent >= 800) {
        document.getElementById('size').textContent = 800;
        size = 800;
    }
    document.getElementById('size').textContent = size;
}

const minus10 = document.getElementById('decrease10');

minus10.onclick = decrementSize10; // when the "-10" button is clicked it lowers the size value for the cursor's drawing and erasing by ten

function decrementSize10() {
    size -= 10;
    document.getElementById('size').textContent = size;
    if(document.getElementById('size').textContent <= 0) {
        document.getElementById('size').textContent = 1;
        size = 1;
    }
}

const add10 = document.getElementById('increase10');

add10.onclick = incrementSize10; // when the "+10" button is clicked it raises the size value for the cursor's drawing and erasing by ten

function incrementSize10() {
    size += 10;
    if(document.getElementById('size').textContent >= 800) {
        document.getElementById('size').textContent = 800;
        size = 800;
    }
    document.getElementById('size').textContent = size;
}

const clearButton = document.getElementById("clear");

clearButton.onclick = clear;// draws a background color circle bigger than the canvas to clear the canvas

function clear() {
    ctx.beginPath();
    transparency = 1;
    ctx.globalAlpha = transparency;
    document.getElementById('transparent').value = transparency;
    ctx.arc(400, 400, 570, 0, Math.PI * 2);
    color = '#f5f5f5';
    ctx.fillStyle = color;
    ctx.fill();
}

function eraseCircle(x, y) { // draws a background color circle at the mouse's location to erase anything drawn there
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    transparency = document.getElementById('transparent').value;
    ctx.globalAlpha = transparency;
    color = '#f5f5f5';
    ctx.fillStyle = color;
    ctx.fill();
}

function eraseLine(x1, y1, x2, y2) { // draws a background color line following the mouse to erase anything drawn there
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    transparency = document.getElementById('transparent').value;
    ctx.globalAlpha = transparency;
    color = '#f5f5f5';
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

