function DOMHandlePlanetList(thePlanet) {
  const massInput = document.createElement("INPUT");
  massInput.type = "number";
  massInput.value = thePlanet.mass;
  massInput.min = 1;
  massInput.max = 50;
  massInput.addEventListener("change", function () {
    thePlanet.mass = this.value;
  });

  const li = document.createElement("LI");
  li.id = thePlanet.id;
  const deleteBtn = document.createElement("BUTTON");
  const unpauseBtn = document.createElement("BUTTON");
  unpauseBtn.innerHTML = "Play";
  unpauseBtn.addEventListener("click", function () {
    if (thePlanet.paused) {
      thePlanet.active = true;
      thePlanet.paused = false;
      this.innerHTML = "Stop";
    } else {
      thePlanet.active = false;
      thePlanet.paused = true;
      this.innerHTML = "Play";
    }
  });

  deleteBtn.innerHTML = "X";
  deleteBtn.addEventListener("click", function () {
    // for (let i = 0; i < planets.length; i++) {
    //   if (planets[i].id === self.id) {
    //     planets.splice(i, 1);
    //   }
    // }

    planets = planets.filter((planet) => {
      if (planet.id !== thePlanet.id) {
        return planet;
      }
    });

    const ul = li.parentNode;
    ul.removeChild(li);
  });

  li.appendChild(massInput);
  li.appendChild(deleteBtn);
  li.appendChild(unpauseBtn);
  planetListElement.appendChild(li);
}
