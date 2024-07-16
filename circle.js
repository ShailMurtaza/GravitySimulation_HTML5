class Circle {
    constructor(pos, mass, speed, color, canvas, ctx) {
        this.pos = pos
        this.mass = mass
        this.speed = speed
        this.radius = mass / 2
        this.color = color
        this.pointer = false
        this.ctx = ctx
        this.canvas = canvas
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false)
        if (!this.pointer) {
            this.ctx.fillStyle = this.color
            this.ctx.fill()
        }
        else {
            this.ctx.stroke()
        }
    }

    move(x, y) {
        this.pos.x = x
        this.pos.y = y
    }
}

