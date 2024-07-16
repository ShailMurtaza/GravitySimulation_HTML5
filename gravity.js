const canvas = new Canvas("canvas")

var all_balls = []
function create_ball(x, y, speed, color="black", mass=10) {
    const ball = new Circle({x: x, y: y}, mass, speed, color, canvas.get_canvas(), canvas.get_ctx())
    all_balls.push(ball)
}

create_ball(canvas.w()/2, canvas.h()/2-100, {x: 0, y: 3}, "red", 10)
create_ball(canvas.w()/2+100, canvas.h()/2, {x: 0, y: -3}, "black", 10)
// create_ball(40, 30, {x: 0, y: 0}, "blue", 50)
// create_ball(canvas.w()/2, canvas.h()/2, {x: -6, y: 4}, "red", 10)
// create_ball(canvas.w()/2+40, canvas.h()/2+30, {x: 2, y: -2}, "black", 10)

function gravity(balls) {
    // Delta Time
    const dt = 0.07
    // Gravitational Constant
    const G = 20
    for(let i=0;i<balls.length;i++) {
        for(let j=0;j<balls.length;j++) {
            // Skip calculations if index is same.
            if (i == j) continue
            const ball1 = balls[i]
            const ball2 = balls[j]
            const dx = (ball2.pos.x - ball1.pos.x) // Distance along x-axis
            const dy = (ball2.pos.y - ball1.pos.y) // Distance along y-axis
            const dist = Math.sqrt(dx * dx + dy * dy) // Total Distance between balls
            const force = G * ball1.mass * ball2.mass / (dist * dist) // Magnitude of force
            const fx = force * dx / dist // Force along x-axis
            const fy = force * dy / dist // Force along y-axis

            // Calculate acceleration
            const ax1 = fx / ball1.mass
            const ay1 = fy / ball1.mass
            const ax2 = fx / ball2.mass
            const ay2 = fy / ball2.mass

            // Add acceleration to speed of ball
            ball1.speed.x += ax1
            ball1.speed.y += ay1
            ball2.speed.x -= ax2
            ball2.speed.y -= ay2

            const ball2_x = ball2.pos.x + ball2.speed.x * dt
            const ball2_y = ball2.pos.y + ball2.speed.y * dt
            ball2.move(ball2_x, ball2_y)
        }
        const ball1_x = balls[i].pos.x + balls[i].speed.x * dt
        const ball1_y = balls[i].pos.y + balls[i].speed.y * dt
        balls[i].move(ball1_x, ball1_y)
    }
}

function draw() {
    gravity(all_balls)
    canvas.clear()
    for(let i=0;i<all_balls.length;i++) {
        all_balls[i].draw()
    }
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
