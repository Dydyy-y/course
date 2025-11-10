class Grid {
  constructor(columns, rows, sizeCase) {
    this.columns = columns;
    this.rows = rows;
    this.sizeCase = sizeCase;
    this.grid = [];
    this.initGrid();
  }

  initGrid() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      for (let column = 0; column < this.columns; column++) {
        this.grid[row][column] = 0;
        if (row === 0 || this.rows - 1 || column === 0 || this.columns - 1) {
          this.grid[row][column] = 1;
        }
      }
    }
  }

  render(ctx) {}

  isWall(x, y) {}
}
