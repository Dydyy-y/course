/* const canvasElement = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 400;

ctx.fillStyle = 'blue'

ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI)

ctx.fill(); */

const CE = 40;
const ROWS = 13;
const COLUMN = 15;

function gridCreation() {
    for (let row = 0 ; row < ROWS ; row++) {
        if(row === 0 || row === 13){
            console.log("W")
        }
        for (let col = 0 ; col < COLUMN ; col++){
            console.log(`${row} ${col}`);
        }
    }
}