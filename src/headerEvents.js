const setHeaderEvents = () => {
    const header = document.querySelector('.header');
    const upArrow = document.querySelector('.up');

    window.addEventListener('scroll', (e) => {
        if (document.scrollingElement.scrollTop >= 160) {
            header.className = "header header-bye";
            upArrow.setAttribute('class', "up up-enter");
            upArrow.setAttribute('style', '')
        } else {
            header.className = "header";
            upArrow.setAttribute('class', "up header-bye");
        }
    })
}

export default setHeaderEvents;