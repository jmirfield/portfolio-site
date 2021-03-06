'use strict';

class Particles {
    #canvas;
    #ctx;
    #list;
    #max;
    constructor(canvas, n) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#list = new Array(n);
        this.#max = screen.width > 768 ? 5000 : 2000;
        this.mouse = {
            down: false,
            x: undefined,
            y: undefined
        };
        this.#init();
    }


    #init() {
        for (let i = 0; i < this.#list.length; i++) {
            this.#list[i] = new Particle(Math.floor(Math.random() * this.#canvas.width), Math.floor(Math.random() * this.#canvas.height), this.#list, this.#max);
        }
        const rect = this.#canvas.getBoundingClientRect()
        this.#canvas.addEventListener('mousedown', (e) => {
            this.mouse = {
                down: true,
                x: e.clientX,
                y: e.clientY - rect.top
            }
        })
        this.#canvas.addEventListener('mouseup', (e) => {
            this.mouse = {
                down: false,
                x: undefined,
                y: undefined
            };
        })

        this.#canvas.addEventListener('mousemove', (e) => {
            this.mouse = {
                ...this.mouse,
                x: e.clientX,
                y: e.clientY - rect.top
            };
        })
    }

    draw() {
        for (let i = 0; i < this.#list.length; i++) {
            this.#ctx.fillRect(this.#list[i].x, this.#list[i].y, this.#list[i].width, this.#list[i].height);
            this.#list[i].update(this.mouse);
        }
    }
}

class Particle {
    constructor(x, y, list, max) {
        this.x = x;
        this.y = y;
        this.width = Math.floor(Math.random() * 3) + 1;
        this.height = Math.floor(Math.random() * 3) + 1;
        this.count = 0;
        this.list = list;
        this.max = max;
    }

    update({ down, x, y }) {
        // if (!down) {
        //     const xVel = Math.random() < .5 ? 1 : -1;
        //     const yVel = Math.random() < .5 ? 1 : -1;
        //     this.x += xVel;
        //     this.y += yVel;
        // } else {
        //     const xRandom = Math.floor((Math.random() * 3) * (Math.random() < .5 ? -1 : 1))
        //     const yRandom = Math.floor((Math.random() * 3) * (Math.random() < .5 ? -1 : 1))
        //     const xVel = x <= this.x ? -2 : 2 + xRandom;
        //     const yVel = y <= this.y ? -2 : 2 + yRandom;
        //     this.x += xVel;
        //     this.y += yVel;
        // }
        const xVel = Math.random() < .5 ? 1 : -1;
        const yVel = Math.random() < .5 ? 1 : -1;
        this.x += xVel;
        this.y += yVel;
        if (this.count > 20) {
            if (this.list.length < this.max) {
                const particle = new Particle(this.x, this.y, this.list);
                this.list.push(particle);
                this.count = 0;
            }
        } else {
            this.count++;
        }
    }
}

export default Particles;