window.onload = function () {
  /*
   *
   *
   *
   */
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  /*
   *
   *
   *
   */
  const GRAVITY = 0.6;
  class Circle {
    x;
    y;
    r;
    color;
    mass = 0;
    /*inertia = {
      x: 0,
      y: 0,
    };*/
    velocity = {
      x: 0,
      y: 0,
    };
    constructor(x, y, r, color, mass, velocity) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.mass = mass;
      this.velocity = velocity;
      //this.inertia = inertia;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      ctx.fill();
    }
    moveTo(star) {
      const distance = this.distanceTo(star);
      const attraction = this.getAttractForce(distance, star);
      // https://stackoverflow.com/questions/20762079/moving-an-object-towards-a-point-in-javascript

      // Delta entre destino y origen
      const deltaX = star.x - this.x;
      const deltaY = star.y - this.y;

      // Ángulo entre ambos puntos
      const angle = Math.atan2(deltaY, deltaX);

      // if (distance > star.r + this.r) {
      //   // Obtener vector de velocidad
      this.velocity.x += attraction * Math.cos(angle);
      this.velocity.y += attraction * Math.sin(angle);

      console.log(this.velocity.x);

      this.move();
      // }
    }

    getAttractForce(distance, star) {
      const force = GRAVITY * ((this.mass * star.mass) / Math.pow(distance, 2));
      return force;
    }

    move() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      // this.x += this.inertia.x;
      // this.y += this.inertia.y;
    }

    distanceTo(star) {
      const x1 = this.x;
      const y1 = this.y;
      const x2 = star.x;
      const y2 = star.y;

      const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      return Math.floor(distance);
    }
  }
  const sun = new Circle(
    canvas.width / 2,
    canvas.height / 2,
    50,
    "yellow",
    1700
  );
  // const planet = new Circle(400, 200, 5, "cyan", 20, { x: 1, y: -1 });
  // const planet2 = new Circle(1200, 200, 15, "red", 50, { x: 3, y: 6 });
  // const planet3 = new Circle(1300, 300, 10, "green", 30, { x: 3, y: 6 });

  const planets = [
    new Circle(400, 200, 5, "cyan", 20, { x: 1, y: 5 }),
    new Circle(1200, 200, 15, "red", 50, { x: 3, y: 6 }),
    new Circle(500, 800, 10, "green", 33, { x: 4, y: 3 }),
    new Circle(500, 800, 12, "green", 44, { x: 4, y: 3 }),
    new Circle(500, 800, 14, "green", 55, { x: 4, y: 3 }),
    new Circle(500, 800, 16, "green", 66, { x: 4, y: 3 }),
    new Circle(400, 200, 5, "cyan", 30, { x: 1, y: 5 }),
    new Circle(400, 200, 5, "cyan", 15, { x: 10, y: 3 }),
    new Circle(1100, 600, 12, "white", 18, { x: -4.5, y: 10 }),
  ];
  /*
   *
   *
   *
   */
  function render() {
    // Render canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sun.draw();

    // Update planets
    for (planet of planets) {
      planet.draw();
      planet.moveTo(sun);
    }
  }

  /*
   *
   *
   *
   */
  const fps = 60;
  setInterval(function () {
    render();
  }, 1000 / fps);
};
