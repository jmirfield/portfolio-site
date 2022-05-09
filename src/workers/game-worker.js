import { GameOfLife } from '../scripts/gameOfLife.js';

self.onmessage = ({ data }) => {
  if (data.status === 'UPDATE') {
    self.postMessage(GameOfLife.checkMatrix(data.matrix));
  };
};