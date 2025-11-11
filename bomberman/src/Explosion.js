class Explosion extends Entity {
  constructor(x, y, duration) {
    super(x, y);
    this.duration = duration;
  }

  render(ctx, sizeCase) {
    ctx.fillStyle = "#d00000";
    ctx.fillRect(
      this.x * sizeCase,      
      this.y * sizeCase,    
      sizeCase,               
      sizeCase             
    );
  }

  update() {}   
}
