//selecting canvas element
const canvas = document.querySelector("canvas");

//setting canvas width and height
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

//geting context
const c = canvas.getContext("2d");

//eventlistener for size change of window
window.addEventListener("resize", () => {
  //setting canvas width and height
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  //regenerate circles
  init();
});

//mouse obj
const mouse = {
  x: undefined,
  y: undefined,
};
// eventlistener for mouse movement
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

//max and min radius that a circle can grow to
const maxradius = 55;
//array of colors
const colorsArray = ["#3F8EBF", "#042F40", "#D90404", "#F2A20C", "#167362"];
//circle class with draw and move methods
class MovingCircles {
  constructor(x, y, r, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.minradius = r;
    this.color = colorsArray[Math.floor(5 * Math.random())];
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  move() {
    if (this.x < this.r || this.x > canvas.width - this.r) {
      this.x = this.x < this.r ? this.r : canvas.width - this.r;
      this.vx *= -1;
    }
    if (this.y < this.r || this.y > canvas.height - this.r) {
      this.y = this.y < this.r ? this.r : canvas.height - this.r;
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;

    //interection with mouse
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      if (this.r < maxradius) {
        this.r++;
      }
    } else if (this.r > this.minradius) {
      this.r--;
    }

    this.draw();
  }
}

//animate function for animation, circle array is used for objets
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach((circle) => {
    circle.move();
  });
};

//creates array of circles
let circleArray;

//initialization
const init = () => {
  circleArray = [];
  for (
    let i = 0;
    i < Math.floor(canvas.height * canvas.width * 8 * Math.pow(10, -4));
    i++
  ) {
    let r = Math.random() * 5 + 2;
    let x = Math.random() * (canvas.width - r) + r;
    let y = Math.random() * (canvas.height - r) + r;
    let vx = (Math.random() < 0.5 ? 1 : -1) * Math.random() * 3 + 1;
    let vy = (Math.random() < 0.5 ? 1 : -1) * Math.random() * 3 + 1;
    circleArray.push(new MovingCircles(x, y, r, vx, vy));
  }
};

//calling animate function
init();
animate();
