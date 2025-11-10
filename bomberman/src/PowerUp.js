class PowerUp extends Entity {
  constructor(x, y, type) {
    super(x, y);
    this.type = type;
  }

  render(ctx, sizeCase) {
    if (this.type === "speed") {
      ctx.fillStyle = "#ffff00";
    } else if (this.type === "bomb") {
      ctx.fillStyle = "#008000";
    } else if (this.type === "range") {
      ctx.fillStyle = "#0000ff";
    }

    ctx.fillRect(this.x * sizeCase, this.y * sizeCase, sizeCase, sizeCase);
  }

  update() {
  }
}