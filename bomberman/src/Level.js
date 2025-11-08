class Level {
    constructor (width, height, sizeCase) {
        this.columns = width; //15
        this.rows = height; //13
        this.sizeCase = 40; 
        this.grid = [];

        this.createGrid();
    }
    createGrid() {
        for(let row; row < this.rows; row++) {
            this.grid[i] = [];
            for(let column; column < this.columns; column++){
                if(row === 0 || row === this.rows[-1] || column === 0 || column === this.columns[-1]) {
                    this.grid[row][column] = 'W';
                }
                else {
                    this.grid[row][column] = '.';
                }
            }
        }
    }
}


























/*
const canvasElement = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 400;

ctx.fillStyle = 'blue'

ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI)

ctx.fill(); */