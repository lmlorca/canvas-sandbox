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
  const GRAVITY = 1;
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
    speed = 0.01;
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
      const distanceToStar = this.distanceTo(star);

      const distanceX = star.x - this.x;
      const distanceY = star.y - this.y;

      // constante gravitacional
      // ACC directamente inversamente a la distancia al sol
      // la aceleracion maxima tiene que ser visible en 60 fps

      // if (this.speed < 0.075) {
      //   this.speed += 0.01;
      // }

      const acceleration = distanceToStar * 0.01;

      if (distanceToStar > 0 + this.r + star.r && acceleration > 0) {
        this.x += distanceX * this.speed;
        this.y += distanceY * this.speed;
      }
    }

    distanceTo(star) {
      const x1 = this.x;
      const y1 = this.y;
      const x2 = star.x;
      const y2 = star.y;

      const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      return distance;
    }
  }
  const sun = new Circle(canvas.width / 2, canvas.height / 2, 120, "yellow");
  const planet = new Circle(100, 133, 20, "cyan");
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

    // Move objects
    planet.moveTo(sun);
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
