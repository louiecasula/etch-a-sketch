const board = document.querySelector('.board');

const slider = document.getElementById("myRange");

const boardSize = document.querySelector('.boardSize');

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
            square.addEventListener('mousedown', colorIn);
            square.addEventListener('mouseover', colorInHover);
            row.appendChild(square);
        }
        board.appendChild(row);
    };
}

function colorIn() {
    this.style.backgroundColor = 'black';
}

function colorInHover() {
    if (isMouseDown) {
        this.style.backgroundColor = 'black';
    }
}

let updateBoardSize = (length) => {
    boardSize.innerHTML = `<h3>${length} x ${length}</h3>`;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.cssText = 'background-color: white';
    });
});

// How can we make this not repeat?
let length = slider.value;
createBoard(length);
updateBoardSize(length);

slider.oninput = function() {
    length = this.value;
    createBoard(length);
    updateBoardSize(length);
};