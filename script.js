let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let selectedTheme = "light";
let touchStartX, touchStartY;
let gameStarted = false;

// Делаем игровое поле подстраивающимся под экран
function setup() {
    if (!gameStarted) return; // НЕ создаём холст, если игра ещё не запущена

    let canvasSize = Math.min(windowWidth * 0.8, windowHeight * 0.6);
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('game-container');
    createTiles();
}

function startGame() {
    gameStarted = true;
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    createCanvas(400, 400).parent('game-container'); // Создаём холст вручную
    createTiles();
    moveCount = 0;
    startTime = new Date();
    redraw(); // Перерисовываем холст
}

function draw() {
    if (!gameStarted) return; // Если игра не запущена — ничего не рисуем

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
