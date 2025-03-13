let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let selectedTheme = "light";
let touchStartX, touchStartY;

// Размер холста адаптируется под экран устройства
function setup() {
    let canvasSize = Math.min(windowWidth, windowHeight) * 0.8;
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('game-container');
    createTiles();
}

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
                textSize(tileSize * 0.4);
                textAlign(CENTER, CENTER);
                text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            }
        }
    }
}
