const prompt = require('prompt-sync')({ sigint: true });
const chalk = require('chalk');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.positionX = 0;
        this.positionY = 0;
        this.gameOver = false;
        this.turnCount = 0;
    }

    static generateField(height, width, holePercentage = 0.2) {
        let field;
        let startX, startY, hatX, hatY;
        let isSolvable = false;

        while (!isSolvable) {
        field = Array.from({ length: height }, () =>
            Array.from({ length: width }, () =>
            Math.random() < holePercentage ? hole : fieldCharacter
            )
        );

        do {
            startX = Math.floor(Math.random() * width);
            startY = Math.floor(Math.random() * height);
        } while (field[startY][startX] === hole);

        do {
            hatX = Math.floor(Math.random() * width);
            hatY = Math.floor(Math.random() * height);
        } while ((hatX === startX && hatY === startY) || field[hatY][hatX] === hole);

        field[startY][startX] = pathCharacter;
        field[hatY][hatX] = hat;

        isSolvable = Field.isSolvable(field, startX, startY);
        }

        const newField = new Field(field);
        newField.positionX = startX;
        newField.positionY = startY;
        return newField;
    }

    static isSolvable(field, startX, startY) {
        const height = field.length;
        const width = field[0].length;
        const visited = Array.from({ length: height }, () => Array(width).fill(false));
        const queue = [[startX, startY]];
        visited[startY][startX] = true;

        const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
        ];

        while (queue.length > 0) {
        const [x, y] = queue.shift();
        if (field[y][x] === hat) return true;

        for (let [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (ny >= 0 && ny < height && nx >= 0 && nx < width &&
                !visited[ny][nx] && field[ny][nx] !== hole) {
            visited[ny][nx] = true;
            queue.push([nx, ny]);
            }
        }
        }

        return false;
    }

    addHole() {
        let x, y;
        do {
        y = Math.floor(Math.random() * this.field.length);
        x = Math.floor(Math.random() * this.field[0].length);
        } while (this.field[y][x] !== fieldCharacter);
        this.field[y][x] = hole;
    }

    print() {
        console.log('\x1Bc'); // Clear terminal
        for (let y = 0; y < this.field.length; y++) {
        let row = '';
        for (let x = 0; x < this.field[y].length; x++) {
            const cell = this.field[y][x];
            if (x === this.positionX && y === this.positionY) {
            row += chalk.bgBlueBright.white.bold(` ${pathCharacter} `);
            } else if (cell === hole) {
            row += chalk.bgRed.black(` ${hole} `);
            } else if (cell === hat) {
            row += chalk.bgYellow.black(` ${hat} `);
            } else {
            row += chalk.bgGreen.black(` ${fieldCharacter} `);
            }
        }
        console.log(row);
        }
    }

    isInBounds(x, y) {
        return y >= 0 && y < this.field.length && x >= 0 && x < this.field[0].length;
    }

    getCurrentCell() {
        return this.field[this.positionY][this.positionX];
    }

    movePlayer(direction) {
        switch (direction.toUpperCase()) {
        case 'W': this.positionY--; break;
        case 'S': this.positionY++; break;
        case 'A': this.positionX--; break;
        case 'D': this.positionX++; break;
        default: console.log('Invalid input. Use W A S D to move.'); return;
        }

        if (!this.isInBounds(this.positionX, this.positionY)) {
        console.log(chalk.bgRed.white.bold(' You moved out of bounds. Game Over. '));
        this.gameOver = true;
        return;
        }

        const currentCell = this.getCurrentCell();

        if (currentCell === hole) {
        console.log(chalk.bgRed.white.bold(' You fell into a hole! Game Over. '));
        this.gameOver = true;
        } else if (currentCell === hat) {
        console.log(chalk.bgGreen.black.bold(' You found your hat! You win! '));
        this.gameOver = true;
        } else {
        this.field[this.positionY][this.positionX] = pathCharacter;
        }

        this.turnCount++;
        if (this.turnCount % 5 === 0) {
        console.log(chalk.magenta('Hard mode: A new hole has appeared!'));
        this.addHole();
        }
    }
    }

    function startGame() {
    const height = Number(prompt('Enter field height (e.g. 10): '));
    const width = Number(prompt('Enter field width (e.g. 20): '));
    const difficulty = Number(prompt('Enter hole difficulty (0.1 = easy, 0.3 = hard): '));

    const myField = Field.generateField(height, width, difficulty);

    while (!myField.gameOver) {
        myField.print();
        const move = prompt("Which direction? (W = up, S = down, A = left, D = right): ");
        myField.movePlayer(move);
    }

    const restart = prompt('Do you want to play again? (Y/N): ');
    if (restart.toUpperCase() === 'Y') {
        startGame();
    } else {
        console.log('Thanks for playing!');
    }
}

startGame();
