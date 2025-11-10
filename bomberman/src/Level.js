class Level {
  constructor(columns, rows, sizeCase) {
    this.columns = columns;
    this.rows = rows;
    this.sizeCase = sizeCase;
    this.grid = [];

    this.createGrid();  //automatic call for the method
  }

  createGrid() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];

      for (let column = 0; column < this.columns; column++) {
        if (
          //border
          row === 0 ||
          row === this.rows - 1 ||
          column === 0 ||
          column === this.columns - 1
        ) {
          this.grid[row][column] = "W";
        } else if (
          row >= 2 &&
          row % 2 === 0 &&
          column >= 2 &&
          column % 2 === 0
        ) {
          //wall grid
          this.grid[row][column] = "W";
        } else {
          if (
            (row === 1 && column === 1) ||
            (row === 1 && column === 2) ||
            (row === 2 && column === 1)
          ) {
            this.grid[row][column] = ".";
          } else {
            if (Math.random() < 0.5) {
              this.grid[row][column] = "S";
            } else {
              this.grid[row][column] = ".";
            }
          }
        }
      }
    }
  }
}