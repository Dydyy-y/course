class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.life = 3;
    this.bombCount = 1; //nb bombe dispomible
    this.bombRange = 1;
    this.speed = 1;
  }

  render(ctx, sizeCase) {
    ctx.fillStyle = "#7F00FF";
    ctx.fillRect(
      (this.x * sizeCase),  //conversion position en px
      (this.y * sizeCase),
      sizeCase,
      sizeCase
    );
  }
}
