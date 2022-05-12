'use strict';

class Typewriter {
    #messages;
    #position;
    #index;
    #text;
    #stage;
    #delay;
    constructor(messages) {
        this.#messages = messages;
        this.#text = "";
        this.#index = 0;
        this.#position = 0;
        this.#stage = 0;
        this.#delay = 0;
    }


    get text() {
        if (this.#delay % 5 !== 0) {
            return this.#text + "&nbsp"
        }
        return this.#text + "_";
    }

    update() {
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