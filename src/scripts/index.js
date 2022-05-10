import Typewriter from "./typewriter";
// import Particles from "./particles";
import { GameOfLife, GameRenderer } from './gameOfLife';
import '../styles/mainCanvas.css';

const mainCanvas = () => {
    const canvas = document.getElementById('home');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const TYPED_MESSAGES = [
        "Software Engineer",
        "Front-End Developer",
        "Back-End Developer"
    ];

    const typewriter = new Typewriter(canvas, TYPED_MESSAGES);

    // const particles = new Particles(canvas, 100);

    const gameOfLife = new GameOfLife(150);
    const gameOfLifeRenderer = new GameRenderer(gameOfLife, canvas);

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
    })

    const init = () => {
        requestAnimationFrame(animate);
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (show) {
            gameOfLifeRenderer.draw();
            gameOfLifeWorker.postMessage({ status: 'UPDATE', matrix: gameOfLife.matrix });
        }
        typewriter.draw();
        // particles.draw();
        setTimeout(() => requestAnimationFrame(animate), 100)
    }

    init();

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export default mainCanvas;