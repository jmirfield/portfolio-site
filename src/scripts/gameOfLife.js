'use strict';

// class Cell {
//     #isAlive;
//     constructor(isAlive = null, debug = false) {
//         if (debug) {
//             this.#isAlive = isAlive;
//         } else {
//             this.#isAlive = Math.random() > .9 ? true : false;
//         }
//     }

//     get isAlive() {
//         return this.#isAlive;
//     }

//     kill() {
//         this.#isAlive = false;
//     }

//     resurrect() {
//         this.#isAlive = true;
//     }
// }


export class GameOfLife {
    #rows;
    #cols;
    #matrix;
    constructor(n) {
        this.#rows = n;
        this.#cols = n;
        this.#matrix = Array(n).fill().map(row => Array(n));
        this.startGame();
    }

    startGame() {
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                this.#matrix[i][t] = Math.random() > .9 ? true : false;
            }
        }
    }

    get matrix() {
        return this.#matrix
    }

    get rows() {
        return this.#rows;
    }

    get cols() {
        return this.#cols;
    }

    insertCell(i, t, bool) {
        const cell = new Cell(bool, true);
        this.#matrix[i][t] = cell;
        return cell;
    }


    static cellHelper(x, y, matrix) {
        try {
            if (matrix) return matrix[x][y] ? 1 : 0;
            return this.#matrix[x][y].isAlive ? 1 : 0;
        } catch (e) {
            return 0
        }
    }

    static checkNeighbors(x, y, matrix) {
        let count = 0;
        count += this.cellHelper(x - 1, y - 1, matrix)
        count += this.cellHelper(x, y - 1, matrix)
        count += this.cellHelper(x + 1, y - 1, matrix)
        count += this.cellHelper(x - 1, y, matrix)
        count += this.cellHelper(x + 1, y, matrix)
        count += this.cellHelper(x - 1, y + 1, matrix)
        count += this.cellHelper(x, y + 1, matrix)
        count += this.cellHelper(x + 1, y + 1, matrix)
        return count;
    }

    updateMatrix(matrix) {
        this.#matrix = matrix;
    }

    checkMatrix() {
        const toKill = [];
        const toResurrect = [];
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                const count = GameOfLife.checkNeighbors(i, t, this.#matrix);
                if (count < 2 || count > 3) {
                    if (this.#matrix[i][t]) toKill.push({ i, t });
                }
                if (count === 3) {
                    if (!this.#matrix[i][t]) toResurrect.push({ i, t });
                };
            }
        }
        toKill.forEach(({ i, t }) => this.#matrix[i][t] = false);
        toResurrect.forEach(({ i, t }) => this.#matrix[i][t] = true);
    }


    reset() {
        this.startGame();
    }

}

export class GameRenderer {
    #gameOfLife;
    #canvas;
    #ctx;
    #rows;
    #cols;
    #width;
    #height;
    #debug;
    constructor(gameOfLife, canvas, debug = false) {
        this.#gameOfLife = gameOfLife;
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#rows = gameOfLife.rows;
        this.#cols = gameOfLife.cols;
        this.#width = canvas.width / gameOfLife.cols;
        this.#height = canvas.height / gameOfLife.rows;
        this.#debug = debug;
    }

    #fillOne(x, y) {
        const c = this.#ctx;
        c.beginPath();
        c.fillRect(x * this.#width, y * this.#height, this.#width, this.#height);
        c.stroke();
    }

    #drawGrid() {
        const c = this.#ctx;
        const canvas = this.#canvas;
        for (let i = 0; i < this.#rows; i++) {
            c.beginPath();
            c.moveTo(this.#width * i, 0);
            c.lineTo(this.#width * i, canvas.height);
            c.stroke();

            c.beginPath();
            c.moveTo(0, this.#height * i);
            c.lineTo(canvas.width, this.#height * i)
            c.stroke();
        }
    }

    #drawCells() {
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                if (this.#gameOfLife.matrix[i][t]) {
                    this.#fillOne(i, t)
                }
            }
        }
    }

    draw() {
        this.#ctx.globalAlpha = .5;
        if (this.#debug) {
            this.#drawGrid();
        }
        this.#drawCells();
    }
}