import 'jest-canvas-mock';
import GameOfLife from "../scripts/gameOfLife";

let canvas;

beforeEach(() => {
    canvas = document.createElement('canvas');
})

describe('game of life', () => {
    it('should follow rules and only corners should be alive if every space is filled in', () => {
        const n = 4;
        const newGame = new GameOfLife(canvas, n);
        const testMatrix = Array(n).fill().map(row => Array(n));
        for (let i = 0; i < n; i++) {
            for (let t = 0; t < n; t++) {
                const cell = newGame.insertCell(i, t, true);
                testMatrix[i][t] = cell;
                // console.log(Object.is(testMatrix[i][t], newGame.matrix[i][t]));
            }
        }
        newGame.matrixCheck();
        expect(newGame.matrix[0][0].isAlive).toBe(true);
        expect(newGame.matrix[0][n - 1].isAlive).toBe(true);
        expect(newGame.matrix[n - 1][0].isAlive).toBe(true);
        expect(newGame.matrix[n - 1][n - 1].isAlive).toBe(true);
    })
})

