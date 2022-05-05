const setHeaderEvents = () => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', (e) => {
        if(document.scrollingElement.scrollTop >= 160){
            header.className = "header header-bye";
        } else {
            header.className = "header";
        }
    })
}

export default setHeaderEvents;