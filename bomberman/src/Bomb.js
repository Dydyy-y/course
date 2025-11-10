class Bomb extends level {
  constructor(x, y, range) {
    super(x, y);
    this.range = range;
    this.timer = 3000;
  }

  render(ctx, sizeCase) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x * sizeCase, this.y * sizeCase, sizeCase, sizeCase);
  }

  update() {
    //vide pour l'instant
  }
}
