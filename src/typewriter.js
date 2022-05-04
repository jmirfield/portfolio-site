class Typewriter {
    #messages;
    #position;
    #index;
    #text;
    #typeAnimation;

    constructor(messages) {
        this.#messages = messages;
        this.#text = "";
        this.#index = 0;
        this.#position = 0;
        this.#typeAnimation = 0;
    }

    next() {
        if (this.#text.length !== this.#messages[this.#index].length) {
            this.#text += this.#messages[this.#index][this.#position];
            this.#position++;
        } else if (this.#index < this.#messages.length - 1) {
            this.#text = "";
            this.#position = 0;
            this.#index++;
        } else {
            this.#text = "";
            this.#position = 0;
            this.#index = 0;
        }
        this.#typeAnimation++;
    }

    get text() {
        if (this.#typeAnimation > 5 && this.#typeAnimation < 10) {
            return this.#text + "_"
        } else if (this.#typeAnimation >= 10) this.#typeAnimation = 0;
        return this.#text;
    }

}

export default Typewriter;