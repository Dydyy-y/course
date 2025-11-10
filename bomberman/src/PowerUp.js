class Wall extends Entity {
    constructor(x, y, destructible) {
        super(x, y);
        this.destructible = destructible; // Mur cassable ou non
    }
    
    render(ctx, sizeCase) {
        // Gris foncé si indestructible
        // Gris clair si destructible
    }
    
    update() {
        // Rien (les murs ne bougent pas)
    }
}
