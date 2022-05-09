'use strict';

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
    
    reset() {
        this.startGame();
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