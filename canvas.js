class Canvas {
    #canvas
    #height
    #width
    #ctx
    constructor (canvas_id) {
        this.#canvas = document.getElementById(canvas_id)
        this.#height = document.body.clientHeight - 17
        this.#width = document.body.clientWidth - 14
        this.#canvas.height = this.#height
        this.#canvas.width = this.#width
        this.#ctx = /** @type {HTMLCanvasElement} */ this.#canvas.getContext('2d')
    }

    w() {
        return this.#width
    }

    h() {
        return this.#height
    }
    get_ctx() {
        return this.#ctx
    }
    get_canvas() {
        return this.#canvas
    }
    clear() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
    }
}
