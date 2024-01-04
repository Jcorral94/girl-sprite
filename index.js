
let INDEX = 0;
let DIRECTION = 'up';
let prev;
let x = 0;
let y = 0;
let prevMs;

const state = {
  canvas: document.querySelector("#canvas"),
  ctx: canvas.getContext('2d')
};

const girl = new Girl(0, 0, state.ctx, state.canvas, DIRECTION);

init();

window.addEventListener('keydown', keyPress);

async function init() {
  await initCanvas();
  clearCanvas();
  // requestAnimationFrame(draw);
}

async function initCanvas() {
  state.canvas.width = innerWidth;
  state.canvas.height = innerHeight;
  await girl.initImages();
  console.log(girl);
}

function clearCanvas() {
  state.ctx.fillStyle = "black";
  state.ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// function draw(ms) {

//   if (!prevMs) prevMs = ms;

//   if ((ms - prevMs) > 60) {
//     clearCanvas();
//     girl.show();
//     girl.update(DIRECTION);
//     prevMs = ms;
//   }

//   window.requestAnimationFrame(draw);
// }

function keyPress(event) {
  clearCanvas();
  if (event.key === 'ArrowUp') {
    prev = DIRECTION;
    DIRECTION = 'up';
    girl.update(DIRECTION, prev);
  } else if (event.key === 'ArrowRight') {
    prev = DIRECTION;
    DIRECTION = 'right';
    girl.update(DIRECTION, prev);
  } else if (event.key === 'ArrowLeft') {
    prev = DIRECTION;
    DIRECTION = 'left';
    girl.update(DIRECTION, prev);
  } else if (event.key === 'ArrowDown') {
    prev = DIRECTION;
    DIRECTION = 'down';
    girl.update(DIRECTION, prev);
  }
  girl.show();
}