let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let selectedTheme = "light";
let touchStartX, touchStartY;
let canvas;

// Делаем игровое поле подстраивающимся под экран
function setup() {
    noLoop(); // Останавливаем автоматический рендеринг
}

// Функция для запуска игры после нажатия "Старт"
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
    loop(); // Запускаем отрисовку игры
}

// Функция для создания плиток
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

// Функция для отрисовки поля
function draw() {
    background(selectedTheme === "dark" ? 50 : 220);
    let tileSize = width / gridSize;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let value = tiles[y][x];
            if (value !== null) {
                fill(selectedTheme === "dark" ? 100 : 0, 100, 255);
                rect(x * tileSize, y * tileSize, tileSize, tileSize, 10);
                fill(255);
                textSize(tileSize * 0.5);
                textAlign(CENTER, CENTER);
                text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            }
        }
    }
}
