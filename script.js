let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('game-container');
    createTiles();
}

function createTiles() {
    let numbers = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    numbers.push(null);
    numbers = shuffleArray(numbers);

    for (let y = 0; y < gridSize; y++) {
        tiles[y] = [];
        for (let x = 0; x < gridSize; x++) {
            let value = numbers.shift();
            tiles[y][x] = value;
            if (value === null) emptyTile = { x, y };
        }
    }
}

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
                textSize(32);
                textAlign(CENTER, CENTER);
                text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            }
        }
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) moveTile(0, 1);
    if (keyCode === DOWN_ARROW) moveTile(0, -1);
    if (keyCode === LEFT_ARROW) moveTile(1, 0);
    if (keyCode === RIGHT_ARROW) moveTile(-1, 0);
}

function moveTile(dx, dy) {
    let newX = emptyTile.x + dx;
    let newY = emptyTile.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        tiles[emptyTile.y][emptyTile.x] = tiles[newY][newX];
        tiles[newY][newX] = null;
        emptyTile = { x: newX, y: newY };
    }
}

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
