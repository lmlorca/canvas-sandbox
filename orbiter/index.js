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
  class Circle {
    x;
    y;
    r;
    color;
    magnitude = 1;
    velocity = {
      x: 1,
      y: 1,
    };
    constructor(x, y, r, color) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      ctx.fill();
    }
    moveTo(star) {
      // https://stackoverflow.com/questions/20762079/moving-an-object-towards-a-point-in-javascript

      // Delta entre destino y origen
      const deltaX = star.x - this.x;
      const deltaY = star.y - this.y;

      // Ángulo entre ambos puntos
      const angle = Math.atan2(deltaY, deltaX);

      if (this.distanceTo(star) > star.r + this.r) {
        // Obtener vector de velocidad
        this.velocity.x = this.magnitude * Math.cos(angle);
        this.velocity.y = this.magnitude * Math.sin(angle);

        this.move();

        // Magnitude hackerino
        // Me invento una masa que son los diametros
        const totalMass = this.r * 2 + star.r * 2;

        // Esto jfue cacharreando
        // Se ve bien, sobre todo por la masa, pero no creo que sea correcto
        this.magnitude =
          this.magnitude + ((this.distanceTo(star) / 1000) * totalMass) / 1000;

        // this.magnitude = this.magnitude + this.distanceTo(star) / 1000;

        // this.magnitude = this.magnitude + totalMass / 1000;

        // console.log(((this.distanceTo(star) / 1000) * totalMass) / 1000);
      }
    }

    move() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
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
  const sun = new Circle(canvas.width / 2, canvas.height / 2, 20, "yellow");
  const planet = new Circle(0, 0, 5, "cyan");
  const planet2 = new Circle(100, 100, 10, "cyan");
  const planet3 = new Circle(0, 0, 15, "cyan");
  const planet4 = new Circle(canvas.width, canvas.height, 2, "cyan");
  /*
   *
   *
   *
   */
  function render() {
    // Render canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw objects
    sun.draw();
    planet.draw();
    planet2.draw();
    planet3.draw();
    planet4.draw();

    // Move objects
    planet.moveTo(sun);
    planet2.moveTo(sun);
    planet3.moveTo(sun);
    planet4.moveTo(sun);
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
