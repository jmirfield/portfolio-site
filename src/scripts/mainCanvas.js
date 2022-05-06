import Typewriter from "./typewriter";
import Particles from "./particles";
import '../styles/mainCanvas.css';

const mainCanvas = () => {
    const canvas = document.getElementById('home');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const TYPED_MESSAGES = [
        "Software Engineer",
        "Front-End Developer",
        "Back-End Developer",
    ];

    const typewriter = new Typewriter(TYPED_MESSAGES, canvas);
    const particles = new Particles(500, canvas);


    const init = () => {
        requestAnimationFrame(animate);
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        typewriter.draw();
        particles.draw();
        setTimeout(() => requestAnimationFrame(animate), 100)
    }

    init()

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export default mainCanvas;