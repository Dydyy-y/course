class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.level = new Level(15, 13, 40);

    this.canvas.width = this.level.columns * this.level.sizeCase;
    this.canvas.height = this.level.rows * this.level.sizeCase;

    this.player = new Player(1, 1);

    this.setupControls();
  }

  drawGrid() {
    for (let row = 0; row < this.level.rows; row++) {
      for (let column = 0; column < this.level.columns; column++) {
        const cellType = this.level.grid[row][column];
        const x = column * this.level.sizeCase;
        const y = row * this.level.sizeCase;

        //Color choice
        if (cellType === "W") {
          this.ctx.fillStyle = "#2c3e50";
        } else if (cellType === "S") {
          this.ctx.fillStyle = "#e67e22";
        } else {
          this.ctx.fillStyle = "#27ae60";
        }

        this.ctx.fillRect(x, y, this.level.sizeCase, this.level.sizeCase);

        //Border (better ux)
        this.ctx.strokeStyle = "#000";
        this.ctx.strokeRect(x, y, this.level.sizeCase, this.level.sizeCase);
      }
    }
  }

  render() {
    //effacer canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();

    //dessiner joueur
    this.player.render(this.ctx, this.level.sizeCase);
  }

  setupControls() {
    document.addEventListener("keydown", (event) => {
      let direction = null;

      if (event.key === "ArrowUp") {
        direction = "up";
      } else if (event.key === "ArrowDown") {
        direction = "down";
      } else if (event.key === "ArrowLeft") {
        direction = "left";
      } else if (event.key === "ArrowRight") {
        direction = "right";
        //zqsd
      } else if (event.key === "z" || event.key === "Z") {
        direction = "up";
      } else if (event.key === "s" || event.key === "S") {
        direction = "down";
      } else if (event.key === "q" || event.key === "Q") {
        direction = "left";
      } else if (event.key === "d" || event.key === "D") {
        direction = "right";
      }

      if (direction) {
        event.preventDefault(); //empecher scroll page

        const moved = this.player.move(direction, this.level);

        if (moved) { //draw player if move
          this.render();
        }
      }
    });
  }

  start() {
    this.render();
  }
}
