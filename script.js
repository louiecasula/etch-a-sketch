const board = document.querySelector('.board');

const slider = document.getElementById("myRange");

const boardSize = document.querySelector('.boardSize');

let createBoard = (length) => {
    board.innerHTML = ``;
    for (let i = 0; i < length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < length; j++) {
            let square = document.createElement('div');
            square.addEventListener('click', function(){
                square.style.cssText = 'background-color: black;';
            })
            square.classList.add('square');
            row.appendChild(square);
        }
        board.appendChild(row);
    };
}

let updateBoardSize = (length) => {
    boardSize.innerHTML = `<h3>${length} x ${length}</h3>`;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.cssText = 'background-color: white';
    };
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