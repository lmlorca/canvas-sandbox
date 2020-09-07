let canvas;
let ctx;
let planetListElement;
const GRAVITY = 0.6;
let planets = [];

window.onload = function () {
  planetListElement = document.getElementById("PlanetList");
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  ctx = canvas.getContext("2d");

  const sun = new Circle(
    canvas.width / 2,
    canvas.height / 2,
    50,
    "yellow",
    1700
  );
  // planets = [
  //   new Circle(400, 200, 5, "cyan", 20, { x: 1, y: 5 }),
  //   new Circle(1100, 600, 12, "white", 18, { x: -4.5, y: 10 }),
  // ];

  planets = [
    {
      id: "one",
      body: new Circle(400, 200, 5, "cyan", 20, { x: 1, y: 5 }),
    },
    {
      id: "two",
      body: new Circle(1100, 600, 12, "white", 18, { x: -4.5, y: 10 }),
    },
  ];
  planets[0].body.paused = false;
  planets[1].body.paused = false;
  planets[0].body.active = true;
  planets[1].body.active = true;

  const addPlanetBtn = document.getElementById("addPlanetBtn");
  addPlanetBtn.addEventListener("click", function () {
    if (planets.length < 24) {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      const newPlanet = new Circle(1100, 600, 12, color, 18, {
        x: -4.5,
        y: 10,
      });
      newPlanet.createHTML();
      planets.push({ id: newPlanet.id, body: newPlanet });
    }
  });

  function render() {
    // Render canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sun.draw();

    // Update planets
    for (planet of planets) {
      if (planet.body.active) planet.body.draw();
      if (!planet.body.paused) planet.body.moveTo(sun);
    }
  }

  const fps = 60;
  setInterval(function () {
    render();
  }, 1000 / fps);
};
