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

  createHTML() {
    const li = document.createElement("LI");
    li.innerHTML = `<strong>Mass: </strong> ${this.mass} | <strong>Velocity: </storng> ${this.velocity.x} ${this.velocity.y}`;
    planetList.appendChild(li);
  }
}
