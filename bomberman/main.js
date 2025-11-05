const canvasElement = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 400;

ctx.fillStyle = 'blue'

ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI)

ctx.fill();