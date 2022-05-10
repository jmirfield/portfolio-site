customElements.define('my-project',
    class extends HTMLElement {
        constructor() {
            super();

            const img = this.getAttribute('src');
            console.log(img)
            
            const template = document.getElementById('my-project');
            const templateContent = template.content;
            this.attachShadow({ mode: 'open' }).appendChild(
                templateContent.cloneNode(true)
            );
        }
    }
)