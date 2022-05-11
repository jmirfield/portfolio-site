customElements.define('my-project',
    class extends HTMLElement {
        constructor() {
            super();

            const template = document.getElementById('my-project');

            const templateContent = template.content;
            this.attachShadow({ mode: 'open' }).appendChild(
                templateContent.cloneNode(true)
            );

            const title = document.createElement('h3');
            title.innerText = this.getAttribute('title');

            const img = document.createElement('img');
            img.setAttribute('src', this.getAttribute('src'));
            img.setAttribute('loading', 'lazy');
            img.setAttribute('alt', `Demo of my ${this.getAttribute('title')} project`);

            const section = document.createElement('section');
            section.setAttribute('class', 'footer');
            
            const demo = document.createElement('a');
            demo.setAttribute('href', this.getAttribute('demo'));
            demo.innerText = 'Live Demo';

            const source = document.createElement('a');
            source.setAttribute('href', this.getAttribute('github'));
            source.innerText = 'Source';

            section.appendChild(demo);
            section.appendChild(source);

            this.shadowRoot.appendChild(title);
            this.shadowRoot.appendChild(img);
            this.shadowRoot.appendChild(section);

        }
    }
)