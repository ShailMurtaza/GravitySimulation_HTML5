class Circle {
    constructor(pos, mass, speed, color, Canvas) {
        this.pos = pos
        this.mass = mass
        this.speed = speed
        this.radius = mass / 2
        this.color = color
        this.pointer = false
        this.Canvas = Canvas
        this.canvas = Canvas.get_canvas()
        this.ctx = Canvas.get_ctx()
        this.path_points = [{x: pos.x, y: pos.y}]
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

    draw_path() {
        for (let i=1;i<this.path_points.length;i++) {
            const p1 = this.path_points[i-1]
            const p2 = this.path_points[i]
            this.Canvas.line(p1.x, p1.y, p2.x, p2.y, this.color)
        }
    }

    move(x, y) {
        this.pos.x = x
        this.pos.y = y
        this.path_points.push({x: x, y: y})
    }
}

