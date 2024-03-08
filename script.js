const board = document.querySelector('.board');

let length = 16;

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

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.cssText = 'background-color: white';
    };
});