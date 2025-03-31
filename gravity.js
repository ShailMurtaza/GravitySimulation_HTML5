const canvas = new Canvas("canvas")

var all_balls = []
function create_ball(x, y, speed, color="black", mass=10) {
    const ball = new Circle({x: x, y: y}, mass, speed, color, canvas)
    all_balls.push(ball)
}

// create_ball(canvas.w()/2, canvas.h()/2-100, {x: 4, y: 3}, "red", 10)
// create_ball(ca(canvas.w()/2+100, canvas.h()/2, {x: 5, y: -3}, "black", 10)
create_ball(canvas.w()/2-100, canvas.h()/2, {x: -4, y: 3}, "red", 10)
create_ball(canvas.w()/2+100, canvas.h()/2, {x: 4, y: -3}, "black", 10)
// create_ball(canvas.w()/2, canvas.h()/2+200, {x: 10, y: 0}, "blue", 30)
// create_ball(50, 0, {x: 0, y: 4}, "green", 100)

// create_ball(canvas.w()/2-200, canvas.h()/2-250, {x: -4, y: 10}, "red", 1)
// create_ball(canvas.w()/2+100, canvas.h()/2-250, {x: 0, y: 0}, "black", 50)


function gravity(balls) {
    // Delta Time
    const dt = 0.07
    // Gravitational Constant
    const G = 1500
    for(let i=0;i<balls.length;i++) {
        const ball1 = balls[i]
        for(let j=0;j<balls.length;j++) {
            // Skip calculations if index is same.
            if (i == j) continue
            const ball2 = balls[j]
            const dx = (ball2.pos.x - ball1.pos.x) // Distance along x-axis
            const dy = (ball2.pos.y - ball1.pos.y) // Distance along y-axis
            const dist = Math.sqrt(dx * dx + dy * dy) // Total Distance between balls
            const force = G * ball1.mass * ball2.mass / (dist * dist) // Magnitude of force
            const fx = force * dx / dist // Force along x-axis force cos(theta)
            const fy = force * dy / dist // Force along y-axis force sin(theta)

            // Calculate acceleration
            const ax1 = fx / ball1.mass
            const ay1 = fy / ball1.mass
            const ax2 = fx / ball2.mass
            const ay2 = fy / ball2.mass

            // Add acceleration to speed of ball
            ball1.speed.x += ax1 * dt
            ball1.speed.y += ay1 * dt
            ball2.speed.x -= ax2 * dt
            ball2.speed.y -= ay2 * dt

            const ball2_x = ball2.pos.x + ball2.speed.x * dt
            const ball2_y = ball2.pos.y + ball2.speed.y * dt
            ball2.move(ball2_x, ball2_y)
        }
        // Body will change its position with intial velocity even if there is no other force acting on it
        const ball1_x = ball1.pos.x + ball1.speed.x * dt
        const ball1_y = ball1.pos.y + ball1.speed.y * dt
        ball1.move(ball1_x, ball1_y)
    }
}

function draw() {
    canvas.clear()
    gravity(all_balls)
    for(let i=0;i<all_balls.length;i++) {
        all_balls[i].draw_path()
        all_balls[i].draw()
    }
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
