const board = document.querySelector('.board');
const slider = document.getElementById("myRange");
let length = slider.value;
const boardSize = document.querySelector('.boardSize');
let color = 'black';

let isMouseDown = false;
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

let createBoard = (length) => {
    board.innerHTML = ``;
    for (let i = 0; i < length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < length; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mousedown', (event) => colorIn.call(square, color));
            square.addEventListener('mouseover', (event) => colorInHover.call(square, color));
            row.appendChild(square);
        }
        board.appendChild(row);
    };
}

function colorIn(color) {
    this.style.backgroundColor = color;
}

function colorInHover(color) {
    if (isMouseDown) {
        this.style.backgroundColor = color;
    }
}

let updateBoardSize = (length) => {
    boardSize.innerHTML = `<h3 class="dimension">${length} x ${length}</h3>`;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.cssText = 'background-color: white';
    });
});

slider.oninput = function() {
    length = this.value;
    createBoard(length);
    updateBoardSize(length);
};

// Initialization
createBoard(length);
updateBoardSize(length);