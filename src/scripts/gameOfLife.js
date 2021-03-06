'use strict';

export class GameOfLife {
    #matrix;
    constructor(n) {
        this.#matrix = Array(n).fill().map(row => Array(n));
        this.#startGame();
    }

    #startGame() {
        for (let i = 0; i < this.#matrix.length; i++) {
            for (let t = 0; t < this.#matrix.length; t++) {
                this.#matrix[i][t] = Math.random() > .75 ? true : false;
            }
        }
    }

    reset() {
        this.#startGame();
    }

    get matrix() {
        return this.#matrix;
    }

    //For testing purposes
    insertCell(i, t, bool) {
        this.#matrix[i][t] = bool;
    }

    //Static helper function to see if cell is dead or alive
    static cellHelper(x, y, matrix) {
        try {
            return matrix[x][y] ? 1 : 0;
        } catch (e) {
            return 0
        }
    }

    //Static helper function which checks all surrounding cells utilizing cellHelper function
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

    //For rehydrating matrix sent from worker
    updateMatrix(matrix) {
        this.#matrix = matrix;
    }

    //Logic for game
    static checkMatrix(matrix) {
        const updated = matrix;
        const toKill = [];
        const toResurrect = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let t = 0; t < matrix.length; t++) {
                const count = GameOfLife.checkNeighbors(i, t, matrix);
                if (count < 2 || count > 3) {
                    if (matrix[i][t]) toKill.push({ i, t });
                }
                if (count === 3) {
                    if (!matrix[i][t]) toResurrect.push({ i, t });
                };
            }
        }
        toKill.forEach(({ i, t }) => updated[i][t] = false);
        toResurrect.forEach(({ i, t }) => updated[i][t] = true);
        return updated;
    }



}

export class GameRenderer {
    #gameOfLife;
    #canvas;
    #ctx;
    #img;
    #width;
    #height;
    #debug;
    constructor(gameOfLife, canvas, img = false, debug = false) {
        this.#gameOfLife = gameOfLife;
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#img = img;
        this.#width = canvas.width / gameOfLife.matrix.length;
        this.#height = canvas.height / gameOfLife.matrix.length;
        this.#debug = debug;
    }

    #fillOne(x, y) {
        const c = this.#ctx;
        if (!this.#img) {
            c.fillRect(x * this.#width, y * this.#height, this.#width, this.#height);
        } else {
            c.drawImage(this.#img, 0, 0, 10, 10, x * this.#width, y * this.#height, this.#width, this.#height);
        }
    }

    #drawGrid() {
        const c = this.#ctx;
        const canvas = this.#canvas;
        for (let i = 0; i < this.#gameOfLife.matrix.length; i++) {
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
        // const c = this.#ctx;
        // c.beginPath();
        for (let i = 0; i < this.#gameOfLife.matrix.length; i++) {
            for (let t = 0; t < this.#gameOfLife.matrix.length; t++) {
                if (this.#gameOfLife.matrix[i][t]) {
                    this.#fillOne(i, t)
                }
            }
        }
        // c.stroke();
    }

    draw() {
        this.#ctx.globalAlpha = .25;
        if (this.#debug) {
            this.#drawGrid();
        }
        this.#drawCells();
    }
}