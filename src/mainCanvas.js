import Typewriter from "./typewriter";

const mainCanvas = () => {
    const canvas = document.getElementById('home');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const TYPED_MESSAGES = [
        "Full-Stack Developer",
        "Front-End Developer",
        "Back-End Developer",
    ];

    const typewriter = new Typewriter(TYPED_MESSAGES)

    const init = () => {
        window.requestAnimationFrame(animate);
    }

    const animate = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(typewriter.text, canvas.width/2-175, canvas.height/2+75);
        ctx.font = '44px VT323';
        ctx.fillStyle = 'white';
        typewriter.next()
        setTimeout(() => requestAnimationFrame(animate), 100)
    }

    init()

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export default mainCanvas;