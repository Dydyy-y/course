class Wall extends Entity {
    constructor(x, y, destructible) {
        super(x, y);
        this.destructible = destructible;
    }

    render(ctx, sizeCase) {
        if (this.destructible) {
            ctx.fillStyle = '#c5c5c5';
        } else {
            ctx.fillStyle = '#8a8a8a';
        }
        
        ctx.fillRect(
            this.x * sizeCase,
            this.y * sizeCase,
            sizeCase,
            sizeCase
        );
    }

    update() {
    }
}