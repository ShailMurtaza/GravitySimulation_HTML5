# HTML5 based Gravity Simulation

A lightweight, browser-based n-body gravity simulator built with vanilla JavaScript and the HTML5 Canvas API — no frameworks, no build step.

Bodies attract each other via Newton's law of universal gravitation, leave orbital trails behind them, and you can spawn new ones anywhere on the canvas with custom mass and velocity.

## Features

- **N-body gravitational simulation** — every body attracts every other body
- **Orbit trails** — each body draws its recent path (last 240 positions)
- **Click to spawn** — add new bodies at the pointer location
- **Configurable spawn parameters** — mass and initial velocity via sliders
- **Pointer preview** — a ghost circle follows the mouse and reflects the selected mass
- **Zero dependencies** — plain HTML, CSS, and JavaScript

## Getting Started

No build tooling or server is required. Either:

**Open the file directly**

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Or serve it locally**

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

| Control        | Description                                        |
| -------------- | -------------------------------------------------- |
| **Mass**       | Mass of newly spawned bodies (10 – 100)            |
| **Velocity X** | Initial horizontal velocity of spawned bodies (-10 – 10) |
| **Velocity Y** | Initial vertical velocity of spawned bodies (-10 – 10) |
| **Move mouse** | Position the spawn pointer                         |
| **Click**      | Spawn a new body at the pointer                    |

## How It Works

Each frame the simulation:

1. Computes the pairwise gravitational force between every pair of bodies:

   ```
   F = G * m1 * m2 / r²
   ```

2. Resolves the force into x/y components and converts it to acceleration (`a = F / m`).
3. Integrates velocity and position using a fixed time step (`dt`):

   ```
   v += a * dt
   p += v * dt
   ```

4. Redraws the canvas with each body and its trail.

### Constants

Defined in `gravity.js`:

| Constant | Value | Meaning                  |
| -------- | ----- | ------------------------ |
| `G`      | 1500  | Gravitational constant   |
| `dt`     | 0.07  | Time step per frame      |

## Project Structure

```
.
├── index.html   # UI, sliders, and script loading
├── canvas.js    # Canvas wrapper (sizing, drawing, events)
├── circle.js    # Circle class — body state, rendering, trails
└── gravity.js   # Physics loop, spawning, and pointer logic
```

### File Overview

- **`index.html`** — Page markup, slider controls, and value-binding script.
- **`canvas.js`** — `Canvas` class that wraps the `<canvas>` element; handles sizing, clearing, line drawing, and mouse events.
- **`circle.js`** — `Circle` class representing a body: position, mass, velocity, radius (`√mass × 1.2`), color, and its trail of path points.
- **`gravity.js`** — Entry point: creates the canvas, seeds the initial bodies, runs the physics + render loop, and handles user input.

## Customizing

Edit the constants at the top of `gravity.js`:

```js
const dt = 0.07; // Larger = faster (but less stable) simulation
const G = 1500;  // Larger = stronger gravity
```

Change the starting bodies by uncommenting / editing the `create_ball(...)` calls:

```js
create_ball(canvas.w() / 2 - 100, canvas.h() / 2, { x: -4, y: 3 }, "red", 10);
create_ball(canvas.w() / 2 + 100, canvas.h() / 2, { x: 4, y: -3 }, "black", 10);
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Copyright © 2026 Shail Murtaza.
