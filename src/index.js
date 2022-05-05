import './styles/global.css';
import mainCanvas from './scripts/mainCanvas';
import setHeaderEvents from './scripts/headerEvents';

window.onload = () => {
    mainCanvas()
    setHeaderEvents()
}