class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.level = new Level(15, 13, 40);

    this.canvas.width = this.level.columns * this.level.sizeCase;
    this.canvas.height = this.level.rows * this.level.sizeCase;
  }

  rawGrid() {
    for (let row = 0; row < this.level.rows; row++) {
      for (let column = 0; column < this.level.columns; column++) {
        const cellType = this.level.grid[row][column];
        const x = column * this.level.sizeCase;
        const y = row * this.level.sizeCase;
        
        // Choix de la couleur selon le type
        if (cellType === 'W') {
          this.ctx.fillStyle = '#2c3e50'; // Mur indestructible (gris foncé)
        } else if (cellType === 'S') {
          this.ctx.fillStyle = '#e67e22'; // Mur destructible (orange)
        } else {
          this.ctx.fillStyle = '#27ae60'; // Case vide (vert)
        }
        
        // Dessine la case
        this.ctx.fillRect(x, y, this.level.sizeCase, this.level.sizeCase);
        
        // Bordure pour mieux voir les cases
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(x, y, this.level.sizeCase, this.level.sizeCase);
      }
    }
  }

  // Boucle de jeu
  start() {
    this.drawGrid();
  }
}