import './styles/global.css';
import profile from './../public/assets/profile.JPG';
import resume from './../public/assets/resume.pdf';
import mainCanvas from './scripts/mainCanvas';
import setHeaderEvents from './scripts/headerEvents';

document.getElementById('profile').src = profile;
document.getElementById('resume').setAttribute('href', resume);

window.onload = () => {
    mainCanvas()
    setHeaderEvents()
}