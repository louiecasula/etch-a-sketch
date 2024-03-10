const board = document.querySelector('.board');
const sizeSlider = document.getElementById("myRange");
const boardSizeHeader = document.querySelector('.boardSize');

// Default settings
let boardSize = sizeSlider.value; // 16 x 16
let currentMode = 'normal';
let currentColor = 'black';
let isMouseDown = false;

let createBoard = (boardSize) => {
    board.innerHTML = ``; // Remove any previous squares
    for (let i = 0; i < boardSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            // Allow squares to be clicked, or clicked and hovered over, to color them in
            square.addEventListener('mousedown', (event) => {
                event.preventDefault();
                isMouseDown = true;
                colorInSquare.call(square);
            });
            square.addEventListener('mouseup', () => isMouseDown = false);
            square.addEventListener('mouseover', colorInSquareOnHover);
            row.appendChild(square);
        }
        board.appendChild(row);
    };
}

function updateColor() {
    switch(currentMode){
        case('erase'):
            return resetColorToWhite();
        case('shade'):
            return darkenColor();
        case('rainbow'):
            return generateRandomColor();
        default:
            return 'black';
    }
}

function resetColorToWhite() {
    this.style.backgroundColor = 'white';
    this.setAttribute('darkness', '0');
}

function generateRandomColor() {
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

function colorInSquare() {
    if (currentMode === 'shade') { darkenColor.call(this); } 
    else if (currentMode === 'erase') { resetColorToWhite.call(this); }
    else { this.style.backgroundColor = updateColor(); }
}

function colorInSquareOnHover() {
    if (isMouseDown) {
        if (currentMode === 'shade') { darkenColor.call(this); } 
        else if (currentMode === 'erase') { resetColorToWhite.call(this); }
        else { this.style.backgroundColor = updateColor(); }
    }
}

let updateBoardSize = (boardSize) => {
    boardSizeHeader.innerHTML = `<h3 class="dimension">${boardSize} x ${boardSize}</h3>`;
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.cssText = 'background-color: white;';
        square.setAttribute('darkness', '0');
    });
});

sizeSlider.oninput = function() {
    boardSize = this.value;
    createBoard(boardSize);
    updateBoardSize(boardSize);
};

const radioButtons = document.querySelectorAll('.mode');
radioButtons.forEach(setting => {
    setting.addEventListener('change', function() {
        currentMode = setting.id;
    })
})

// Initialization
createBoard(boardSize);
updateBoardSize(boardSize);