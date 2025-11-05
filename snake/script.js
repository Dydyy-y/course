//Création grille
const gridElement = document.getElementById("grid");
const grid = [];

for (let i = 0; i < 10; i++) {
  const row = [];
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.classList.add("case"); //ajout classe css au div
    row.push(cell);
    gridElement.appendChild(cell);
  }
  grid.push(row);
}

let snake = [
  { x: 2, y: 1 }, //tete
  { x: 1, y: 1 },
  { x: 0, y: 1 }
];

let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 }; //necessaire : si l'utilisateur appuie avant que le serpet avance
let gameOver = false;
let apple = null; //null : génération pomme aleatoire apres
let score = 0;
let gameSpeed = 200;
let gameInterval; //stocke id du timer

const scoreElement = document.getElementById("score");  //on pourra modifier le score avec .innerText


//Affichage serpent
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {  //parcourt segments serpent
    const segment = snake[i];
    if (grid[segment.y] && grid[segment.y][segment.x]) { //vérifie que la ligne existe et que la case existe
      const cell = grid[segment.y][segment.x]; //récuperation case html des coordo
      cell.classList.add("snake");
      if (i === 0) {
        cell.classList.add("head");
      }
    }
  }
}

function clearSnake() {
  for (let segment of snake) {
    if (grid[segment.y] && grid[segment.y][segment.x]) { //pareil que pour draw
      const cell = grid[segment.y][segment.x];
      cell.classList.remove("snake", "head");
    }
  }
}


//Gestion pomme
function generateApple() {
  let newApple;
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    newApple = {  //position aléatoire
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10)
    };

    //flag si serpent sur pomme
    let isOnSnake = false;
    for (let segment of snake) {
      if (segment.x === newApple.x && segment.y === newApple.y) {
        isOnSnake = true;
        break;
      }
    }

    if (!isOnSnake) {
      break;
    }
    attempts++;
  }

  apple = newApple;
  console.log("Nouvelle pomme en", apple);
}

function drawApple() {
  if (apple && grid[apple.y] && grid[apple.y][apple.x]) { //vérofie si : pomme existe, ligne existe, case existe
    const cell = grid[apple.y][apple.x];
    cell.classList.add("apple");
  }
}

function clearApple() {
  if (apple && grid[apple.y] && grid[apple.y][apple.x]) {
    const cell = grid[apple.y][apple.x];
    cell.classList.remove("apple");
  }
}


//Déplacement serpent
function moveSnake() {
  direction = nextDirection;  //permet de changer la direction une seule fois par frame (evite les bug)
  
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  //vérification collision mur
  if (newHead.x < 0 || newHead.x >= 10 || newHead.y < 0 || newHead.y >= 10) {
    console.log("Collision mur !!!");
    return "collision";
  }

  //Vérification collision corps
  for (let segment of snake) {
    if (segment.x === newHead.x && segment.y === newHead.y) {
      console.log("Collision corps !!!");
      return "collision";
    }
  }

  // Détection de la pomme
  const ateApple = apple && (newHead.x === apple.x && newHead.y === apple.y); //vérifie si la tête va manger la pomme

  snake.unshift(newHead); //ajoute  nouvelle tete au debut tableau

  if (ateApple) {
    console.log("Bravo ! Score +1");
    score++;
    scoreElement.innerText = score;
    updateSpeed();

    clearApple();
    generateApple();
    drawApple();
    
    return "apple";
  } else { //si pas pomme, retire queue
    snake.pop();
  }

  return "ok";
}


//Accélération
function updateSpeed() {
  if (score > 0 && score % 5 === 0) {
    const newSpeed = Math.max(50, 200 - score * 10);

    if (newSpeed !== gameSpeed) {
      gameSpeed = newSpeed;
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, gameSpeed);
      console.log("Vitesse augmentée ! Maintenant " + gameSpeed + "ms");
    }
  }
}


//Controle
document.addEventListener("keydown", function(event) {
  if (gameOver) return;

  //Empeche défilement page
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) { 
    event.preventDefault();
  }

  //Change nextDirection au lieu de direction directement
  if (event.key === "ArrowUp" && direction.y === 0) {
    nextDirection = { x: 0, y: -1 };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    nextDirection = { x: 0, y: 1 };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    nextDirection = { x: -1, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    nextDirection = { x: 1, y: 0 };
  }
});


//Boucle principale
function gameLoop() {
  if (gameOver) return;

  clearSnake();
  clearApple()
  
  const status = moveSnake();
  
  drawSnake();
  drawApple();

  if (status === "collision") {
    gameOver = true;
    clearInterval(gameInterval);
    
    //attend 100ms avant d'afficher l'alert
    setTimeout(() => {
      alert("GAME OVER ! Score final : " + score);
    }, 100);
  }
}


//Boutin restart
const restartBtn = document.getElementById("restart-btn");
if (restartBtn) { //vérifie boutin
  restartBtn.addEventListener("click", function() {
    console.log("Redémarrage du jeu");

    clearInterval(gameInterval);

    snake = [
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 }; //réinitialise ausis nextDirection
    gameOver = false;
    score = 0;
    gameSpeed = 200;

    // Efface toute la grille
    for (let row of grid) {
      for (let cell of row) {
        cell.classList.remove("snake", "head", "apple");
      }
    }

    scoreElement.innerText = "0";
    
    drawSnake();
    generateApple();
    drawApple();

    gameInterval = setInterval(gameLoop, gameSpeed);

    console.log("Jeu redémarré !");
  });
}


//Démarage jeu
drawSnake();
generateApple();
drawApple();
gameInterval = setInterval(gameLoop, gameSpeed);

console.log("Jeu démarré ! Utilise les flèches ⬆️⬇️⬅️➡️");