import Typewriter from "./typewriter";
import Particles from "./particles";
import GameOfLife from './gameOfLife';
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
    const particles = new Particles(canvas, 50);
    const gameOfLife = new GameOfLife(canvas, 100);

    const init = () => {
        requestAnimationFrame(animate);
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOfLife.draw();
        typewriter.draw();
        // particles.draw();
        setTimeout(() => requestAnimationFrame(animate), 100)
    }

    init()

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export default mainCanvas;