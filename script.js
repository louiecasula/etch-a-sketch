const board = document.querySelector('.board');

let length = 16;

for (let i = 0; i < length; i ++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < length; j++) {
        let square = document.createElement('div');
        square.classList.add('square');
        row.appendChild(square);
    }
    board.appendChild(row);
}