let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let canvas;
let touchStartX, touchStartY; // Для мобильных свайпов

function setup() {
    let canvasSize = Math.min(windowWidth * 0.8, windowHeight * 0.6);
    canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    createTiles();
    draw();
}

// Запуск игры
function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    let canvasSize = Math.min(windowWidth * 0.8, windowHeight * 0.6);
    if (!canvas) {
        canvas = createCanvas(canvasSize, canvasSize);
        canvas.parent('canvas-container');
    } else {
        resizeCanvas(canvasSize, canvasSize);
    }

    createTiles();
    moveCount = 0;
    startTime = new Date();
    loop();
}

// Создание массива плиток
function createTiles() {
    let numbers = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    numbers.push(null);
    numbers = shuffleArray(numbers);

    tiles = [];
    for (let y = 0; y < gridSize; y++) {
        tiles[y] = [];
        for (let x = 0; x < gridSize; x++) {
            let value = numbers.shift();
            tiles[y][x] = value;
            if (value === null) emptyTile = { x, y };
        }
    }
}

// Отрисовка игры
function draw() {
    background(220);
    let tileSize = width / gridSize;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let value = tiles[y][x];
            if (value !== null) {
                fill(0, 100, 255);
                rect(x * tileSize, y * tileSize, tileSize, tileSize, 10);
                fill(255);
                textSize(tileSize * 0.5);
                textAlign(CENTER, CENTER);
                text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            }
        }
    }
}

// Перемешивание плиток
function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        let directions = [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ];
        let move = random(directions);
        moveTile(move.dx, move.dy);
    }
}

// Двигаем плитку
function moveTile(dx, dy) {
    let newX = emptyTile.x + dx;
    let newY = emptyTile.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        tiles[emptyTile.y][emptyTile.x] = tiles[newY][newX];
        tiles[newY][newX] = null;
        emptyTile = { x: newX, y: newY };
        redraw();
    }
}

// Обработка кликов по плиткам
function mousePressed() {
    let tileSize = width / gridSize;
    let x = Math.floor(mouseX / tileSize);
    let y = Math.floor(mouseY / tileSize);

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        if (Math.abs(x - emptyTile.x) + Math.abs(y - emptyTile.y) === 1) {
            moveTile(x - emptyTile.x, y - emptyTile.y);
        }
    }
}

// Обработка свайпов (мобильные устройства)
function touchStarted() {
    touchStartX = mouseX;
    touchStartY = mouseY;
}

function touchEnded() {
    let dx = mouseX - touchStartX;
    let dy = mouseY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) moveTile(-1, 0); // Свайп вправо
        if (dx < -30) moveTile(1, 0); // Свайп влево
    } else {
        if (dy > 30) moveTile(0, -1); // Свайп вниз
        if (dy < -30) moveTile(0, 1); // Свайп вверх
    }

    if (checkWin()) showWinScreen();
}

// Проверка победы
function checkWin() {
    let expected = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    expected.push(null);
    return JSON.stringify(tiles.flat()) === JSON.stringify(expected);
}

// Перемешивание массива (фишек)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
