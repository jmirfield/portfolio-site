'use strict';

import setEvents from './setEvents.js';
import Typewriter from "./typewriter";
import { GameOfLife, GameRenderer } from './gameOfLife';
import cell from '../../public/assets/cell.png';
import '../styles/mainCanvas.css';

//Main Entry
const main = () => {

    setEvents();

    const canvas = document.getElementById('home');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const TYPED_MESSAGES = [
        "Software Engineer",
        "Front-End Developer",
        "Back-End Developer"
    ];

    //Object managing typewriter logic
    const typewriter = new Typewriter(TYPED_MESSAGES);
    const typewriterElement = document.getElementById('typewriter');

    const gameOfLife = new GameOfLife(screen.width > 768 ? 100 : 75);
    const gameOfLifeSprite = document.createElement('img');
    gameOfLifeSprite.setAttribute('src', cell);
    gameOfLifeSprite.setAttribute('alt', "Sprite for game of life simulation");
    gameOfLifeSprite.setAttribute('width', '10px');
    gameOfLifeSprite.setAttribute('height', '10px');
    const gameOfLifeRenderer = new GameRenderer(gameOfLife, canvas, gameOfLifeSprite);

    //Worker handles all logic
    const gameOfLifeWorker = new Worker(new URL('../workers/game-worker.js', import.meta.url));
    gameOfLifeWorker.postMessage({ status: 'UPDATE', matrix: gameOfLife.matrix });
    gameOfLifeWorker.onmessage = ({ data }) => { gameOfLife.updateMatrix(data) };

    const toggle = document.getElementById('toggle');
    const reset = document.getElementById('reset');

    let show = true;

    toggle.addEventListener('click', (e) => {
        show = !show;
    })

    reset.addEventListener('click', (e) => {
        gameOfLife.reset();
        gameOfLifeWorker.postMessage({ status: 'UPDATE', matrix: gameOfLife.matrix });
    })


    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (show) {
            gameOfLifeRenderer.draw();
            gameOfLifeWorker.postMessage({ status: 'UPDATE', matrix: gameOfLife.matrix });
        }
        typewriterElement.innerHTML = typewriter.text;
        typewriter.update();
        setTimeout(() => requestAnimationFrame(animate), 100)
    }

    requestAnimationFrame(animate);

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export default main;