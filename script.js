let gridSize = 4;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let startTime;
let moveCount = 0;
let selectedTheme = "light";
let touchStartX, touchStartY;

function setTheme(theme) {
    selectedTheme = theme;
    document.body.className = theme === "dark" ? "dark-mode" : "";
}

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    createTiles();
    moveCount = 0;
    startTime = new Date();
}

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
                textSize(32);
                textAlign(CENTER, CENTER);
                text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            }
        }
    }
}

// --- КЛАВИАТУРА ---
function keyPressed() {
    if (keyCode === UP_ARROW) moveTile(0, 1);
    if (keyCode === DOWN_ARROW) moveTile(0, -1);
    if (keyCode === LEFT_ARROW) moveTile(1, 0);
    if (keyCode === RIGHT_ARROW) moveTile(-1, 0);

    if (checkWin()) showWinScreen();
}

// --- ТАЧСКРИН (СВАЙПЫ) ---
function touchStarted() {
    touchStartX = mouseX;
    touchStartY = mouseY;
}

function touchEnded() {
    let dx = mouseX - touchStartX;
    let dy = mouseY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) moveTile(-1, 0); // Свайп вправо (движение влево)
        if (dx < -30) moveTile(1, 0); // Свайп влево (движение вправо)
    } else {
        if (dy > 30) moveTile(0, -1); // Свайп вниз (движение вверх)
        if (dy < -30) moveTile(0, 1); // Свайп вверх (движение вниз)
    }

    if (checkWin()) showWinScreen();
}

function moveTile(dx, dy) {
    let newX = emptyTile.x + dx;
    let newY = emptyTile.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        tiles[emptyTile.y][emptyTile.x] = tiles[newY][newX];
        tiles[newY][newX] = null;
        emptyTile = { x: newX, y: newY };
        moveCount++;
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
    moveCount = 0;
    startTime = new Date();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkWin() {
    let expected = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    expected.push(null);
    return JSON.stringify(tiles.flat()) === JSON.stringify(expected);
}

function showWinScreen() {
    let timeTaken = ((new Date() - startTime) / 1000).toFixed(2);

    document.getElementById("game-container").style.display = "none";
    document.getElementById("win-screen").style.display = "block";
    document.getElementById("move-count").textContent = `Ходов: ${moveCount}`;
    document.getElementById("time-count").textContent = `Время: ${timeTaken} сек`;
}

function backToMenu() {
    document.getElementById("win-screen").style.display = "none";
    document.getElementById("menu").style.display = "block";
}
