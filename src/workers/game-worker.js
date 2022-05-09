import { GameOfLife } from '../scripts/gameOfLife.js';

self.onmessage = ({ data }) => {
  if (data.status === 'UPDATE') {
    const toKill = [];
    const toResurrect = [];
    for (let i = 0; i < data.matrix.length; i++) {
      for (let t = 0; t < data.matrix.length; t++) {
        const count = GameOfLife.checkNeighbors(i, t, data.matrix);
        if (count < 2 || count > 3) {
          if (data.matrix[i][t]) toKill.push({ i, t });
        }
        if (count === 3) {
          if (!data.matrix[i][t]) toResurrect.push({ i, t });
        };
      }
    }
    toKill.forEach(({ i, t }) => data.matrix[i][t] = false);
    toResurrect.forEach(({ i, t }) => data.matrix[i][t] = true);
    console.log(data.matrix)
    self.postMessage(data.matrix);
  };
};