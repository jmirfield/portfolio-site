import mainCanvas from './scripts/index.js';
import setEvents from './scripts/setEvents.js';
import resume from './../public/assets/resume.pdf';
import './components/project.js';
import './styles/global.css';

document.getElementById('resume').setAttribute('href', resume);
document.body.style.visibility = 'visible';


window.onload = () => {
    mainCanvas()
    setEvents()
}