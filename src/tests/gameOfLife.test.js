import { GameOfLife } from "../scripts/gameOfLife";

describe('game of life', () => {
    it('should follow rules and only corners should be alive if every space is alive', () => {
        const n = 4;
        const game1 = new GameOfLife(n);
        for (let i = 0; i < n; i++) {
            for (let t = 0; t < n; t++) {
                game1.insertCell(i, t, true);
            }
        }
        game1.updateMatrix(GameOfLife.checkMatrix(game1.matrix));
        expect(game1.matrix[0][0]).toBe(true);
        expect(game1.matrix[0][n - 1]).toBe(true);
        expect(game1.matrix[n - 1][0]).toBe(true);
        expect(game1.matrix[n - 1][n - 1]).toBe(true);
    })

    it('should follow rules and no corner should be alive if every other space is alive', () => {
        const n = 4;
        const game2 = new GameOfLife(n);
        for (let i = 0; i < n; i++) {
            for (let t = 0; t < n; t++) {
                if (t % 2) {
                    game2.insertCell(i, t, true);
                }
                else {
                    game2.insertCell(i, t, false);
                }

            }
        }

        game2.updateMatrix(GameOfLife.checkMatrix(game2.matrix));
        expect(game2.matrix[0][0]).toBe(false);
        expect(game2.matrix[0][n - 1]).toBe(false);
        expect(game2.matrix[n - 1][0]).toBe(false);
        expect(game2.matrix[n - 1][n - 1]).toBe(false);
    })

    it('should follow rules and nothing should be alive since nothing was alive', () => {
        const n = 4;
        const game3 = new GameOfLife(n);
        for (let i = 0; i < n; i++) {
            for (let t = 0; t < n; t++) {
                game3.insertCell(i, t, false);
            }
        }
        game3.updateMatrix(GameOfLife.checkMatrix(game3.matrix));
        for (let i = 0; i < n; i++) {
            for (let t = 0; t < n; t++) {
                expect(game3.matrix[i][t]).toBe(false);
            }
        }
    })
})

