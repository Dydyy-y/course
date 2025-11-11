class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.life = 3;
    this.bombCount = 1; //nb bombe dispomible
    this.bombRange = 1;
    this.speed = 1;
  }

  move(direction, level) {
    let newX = this.x;
    let newY = this.y;

    //new position selon direction
    switch (direction) {
      case "up":
        newY--;
        break;
      case "down":
        newY++;
        break;
      case "left":
        newX--;
        break;
      case "right":
        newX++;
        break;
    }

    //check validation
    if (this.canMoveTo(newX, newY, level)) {
      this.x = newX;
      this.y = newY;
      return true;
    }

    return false;
  }

  //check déplacement newcase
  canMoveTo(x, y, level) {
    if (y < 0 || y >= level.rows || x < 0 || x >= level.columns) {
      return false;
    }
    const cellType = level.grid[y][x];
    return cellType === ".";
  }

  render(ctx, sizeCase) {
    ctx.fillStyle = "#7F00FF";
    ctx.fillRect(
      this.x * sizeCase, //conversion position en px
      this.y * sizeCase,
      sizeCase,
      sizeCase
    );
  }
}
