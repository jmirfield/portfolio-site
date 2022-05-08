import './styles/global.css';
import resume from './../public/assets/resume.pdf';
import mainCanvas from './scripts/mainCanvas';
import setHeaderEvents from './scripts/headerEvents';

document.getElementById('resume').setAttribute('href', resume);

window.onload = () => {
    mainCanvas()
    setHeaderEvents()
}