import './styles/global.css';
import mainCanvas from './mainCanvas';
import setHeaderEvents from './headerEvents';

window.onload = () => {
    mainCanvas()
    setHeaderEvents()
}