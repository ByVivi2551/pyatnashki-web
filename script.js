let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let canvas;

// Запуск игры
function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    let canvasSize = Math.min(windowWidth * 0.8, windowHeight * 0.6);
    if (!canvas) {
        canvas = createCanvas(canvasSize, canvasSize);
        canvas.parent('game-container');
    } else {
        resizeCanvas(canvasSize, canvasSize);
    }

    createTiles();
    moveCount = 0;
    startTime = new Date();
    loop();
}

// Создаём плитки
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

// Проверка победы
function checkWin() {
    let expected = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    expected.push(null);
    return JSON.stringify(tiles.flat()) === JSON.stringify(expected);
}
