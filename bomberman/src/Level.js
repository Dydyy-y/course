class Level {
  constructor(width, height, sizeCase) {
    this.columns = width;
    this.rows = height;
    this.sizeCase = sizeCase;
    this.grid = [];

    this.createGrid();
    }

  createGrid() {
    for (let row = 0; row < this.rows; row++) {
        this.grid[row] = [];

        for (let column = 0; column < this.columns; column++) {
            if (    //border
                row === 0 ||
                row === this.rows - 1 ||
                column === 0 ||
                column === this.columns - 1
            ) {
                this.grid[row][column] = "W";
            } 
            else if (row >= 2 && row % 2 === 0 && column >= 2 && column % 2 === 0) {    //wall grid
                this.grid[row][column] = "W";
            }
            else {
                this.grid[row][column] = ".";
            }
        }
    }
}

}

const level = new Level(15, 13, 40);
console.table(level.grid);

/*
const canvasElement = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 400;

ctx.fillStyle = 'blue'

ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI)

ctx.fill(); */