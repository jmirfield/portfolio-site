'use strict';

class Cell {
    #isAlive;
    constructor(isAlive = null, debug = false) {
        if (debug) {
            this.#isAlive = isAlive;
        } else {
            this.#isAlive = Math.random() > .9 ? true : false;
        }
    }

    get isAlive() {
        return this.#isAlive;
    }

    kill() {
        this.#isAlive = false;
    }

    resurrect() {
        this.#isAlive = true;
    }
}


class GameOfLife {
    #canvas;
    #ctx;
    #rows;
    #cols;
    #width;
    #height;
    #matrix;
    #debug;
    #cache;
    constructor(canvas, n, debug = false) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#rows = n;
        this.#cols = n;
        this.#width = canvas.width / n;
        this.#height = canvas.height / n;
        this.#matrix = Array(n).fill().map(row => Array(n));
        this.#debug = debug;
        this.#cache = {};
        if (!debug) this.startGame();
    }

    startGame() {
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                this.#matrix[i][t] = new Cell();
            }
        }
    }

    get matrix() {
        return this.#matrix
    }

    insertCell(i, t, bool) {
        const cell = new Cell(bool, true);
        this.#matrix[i][t] = cell;
        return cell;
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

    #fillOne(x, y) {
        const c = this.#ctx;
        c.beginPath();
        c.fillRect(x * this.#width, y * this.#height, this.#width, this.#height);
        c.stroke();
    }

    matrixCheck() {
        const toKill = [];
        const toResurrect = [];
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                const count = this.#checkNeighbors(i, t);
                if (count < 2 || count > 3) {
                    toKill.push(this.#matrix[i][t])
                }
                if (count === 3) {
                    toResurrect.push(this.#matrix[i][t])
                };
            }
        }
        toKill.forEach(cell => cell.kill());
        toResurrect.forEach(cell => cell.resurrect());
    }

    #cellHelper(x, y) {
        try {
            return this.#matrix[x][y].isAlive ? 1 : 0;
        } catch (e) {
            return 0
        }
    }

    #checkNeighbors(x, y) {
        let count = 0;
        count += this.#cellHelper(x - 1, y - 1)
        count += this.#cellHelper(x, y - 1)
        count += this.#cellHelper(x + 1, y - 1)
        count += this.#cellHelper(x - 1, y)
        count += this.#cellHelper(x + 1, y)
        count += this.#cellHelper(x - 1, y + 1)
        count += this.#cellHelper(x, y + 1)
        count += this.#cellHelper(x + 1, y + 1)
        return count;
    }



    #drawCells() {
        for (let i = 0; i < this.#rows; i++) {
            for (let t = 0; t < this.#cols; t++) {
                if (this.#matrix[i][t].isAlive) {
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
        this.matrixCheck();
        this.#drawCells();
    }

    reset() {
        this.startGame();
    }

}

export default GameOfLife;