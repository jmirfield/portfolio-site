'use strict';

class Typewriter {
    #canvas;
    #ctx;
    #messages;
    #position;
    #index;
    #text;
    #stage;
    #delay;
    constructor(canvas, messages) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#messages = messages;
        this.#text = "";
        this.#index = 0;
        this.#position = 0;
        this.#stage = 0;
        this.#delay = 0;
    }


    get text() {
        if (this.#delay % 5 !== 0) {
            return this.#text + " "
        }
        return this.#text + "_";
    }

    draw() {
        const font = this.#canvas.width > 768 ? '64px VT323' : '44px VT323';
        this.#ctx.globalAlpha = 1;
        this.#ctx.font = font;
        this.#ctx.fillStyle = 'white';
        this.#ctx.textBaseline = 'middle';
        this.#ctx.textAlign = 'center';
        this.#ctx.fillText(this.text, this.#canvas.width / 2, this.#canvas.height / 2);
        this.#ctx.strokeText(this.text, this.#canvas.width / 2, this.#canvas.height / 2);
        this.#next()
    }

    #next() {
        switch (this.#stage) {
            //Start typing
            case (0): {
                if (this.#text.length !== this.#messages[this.#index].length) {
                    this.#text += this.#messages[this.#index][this.#position];
                    this.#position++;
                } else {
                    this.#stage++
                }
                break;
            }
            //Wait a few seconds
            case (1): {
                if (this.#delay < 15) {
                    this.#delay++;
                } else {
                    this.#stage++;
                    this.#delay = 0;
                }
                break;
            }
            //Start deleting and move to next word or restart loop
            case (2): {
                if (this.#text.length > 0) {
                    this.#text = this.#text.slice(0, -1);
                } else if (this.#text.length === 0 && this.#index < this.#messages.length - 1) {
                    this.#index++;
                    this.#position = 0;
                    this.#stage = 0;
                } else {
                    this.#index = 0;
                    this.#position = 0;
                    this.#stage = 0;
                }
                break;
            }
        }
    }
}

export default Typewriter;