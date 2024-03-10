const board = document.querySelector('.board');
const slider = document.getElementById("myRange");
let length = slider.value;
const boardSize = document.querySelector('.boardSize');

let currentMode = 'normal';
let color = 'black';

let isMouseDown = false;

let createBoard = (length) => {
    board.innerHTML = ``;
    for (let i = 0; i < length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < length; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mousedown', (event) => {
                event.preventDefault();
                isMouseDown = true;
                colorIn.call(square);
            });
            square.addEventListener('mouseup', () => isMouseDown = false);
            square.addEventListener('mouseover', colorInHover);
            row.appendChild(square);
        }
        board.appendChild(row);
    };
}

function updateColor() {
    switch(currentMode){
        case('erase'):
            return erase();
        case('shade'):
            return darkenColor();
        case('rainbow'):
            return randomColor();
        default:
            return 'black';
    }
}

function erase() {
    this.style.backgroundColor = 'white';
    this.setAttribute('darkness', '0');
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function darkenColor() {
    let currentDarkness = this.getAttribute('darkness') || 0;
    currentDarkness = Math.min(1, parseFloat(currentDarkness) + 0.1);
    this.setAttribute('darkness', currentDarkness);
    let colorValue = Math.round((1 - currentDarkness) * 255);
    this.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
}

function colorIn() {
    if (currentMode === 'shade') { darkenColor.call(this); } 
    else if (currentMode === 'erase') { erase.call(this); }
    else { this.style.backgroundColor = updateColor(); }
}

function colorInHover() {
    if (isMouseDown) {
        if (currentMode === 'shade') { darkenColor.call(this); } 
        else if (currentMode === 'erase') { erase.call(this); }
        else { this.style.backgroundColor = updateColor(); }
    }
}

let updateBoardSize = (length) => {
    boardSize.innerHTML = `<h3 class="dimension">${length} x ${length}</h3>`;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.cssText = 'background-color: white;';
        square.setAttribute('darkness', '0');
    });
});

slider.oninput = function() {
    length = this.value;
    createBoard(length);
    updateBoardSize(length);
};

const settings = document.querySelectorAll('.mode');
settings.forEach(setting => {
    setting.addEventListener('change', function() {
        currentMode = setting.id;
    })
})

// Initialization
createBoard(length);
updateBoardSize(length);