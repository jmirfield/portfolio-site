import './styles/global.css';
import resume from './../public/assets/resume.pdf';
import mainCanvas from './scripts/mainCanvas';
import setHeaderEvents from './scripts/headerEvents';
import './components/project.js';

document.getElementById('resume').setAttribute('href', resume);
document.body.style.visibility = 'visible';

window.onload = () => {
    mainCanvas()
    setHeaderEvents()
}