# TP React + TypeScript : Créer un jeu du Pendu

## 1. Rappel des règles du jeu

Le joueur doit deviner un mot en proposant des lettres.  
Chaque lettre fausse rapproche l'affichage complet du pendu.  
Le joueur gagne s'il découvre toutes les lettres avant que le pendu ne soit entièrement affiché.  
Le joueur perd si le nombre maximum d’erreurs est atteint.

----------

## 2. Objectif du TP

Développer un petit jeu complet en React + TypeScript avec :

-   Un fichier JSON pour la liste des mots ;
    
-   Un composant dédié à l’état du jeu (`Game`) ;
    
-   Un composant `WordDisplay` qui affiche un composant `Letter` pour chaque lettre ;
    
-   Un clavier virtuel (`Keyboard`) ;
    
-   Un affichage du pendu (`HangmanDisplay`).
    

----------

## 3. Préparation du projet

### Commandes

`npx create-react-app pendu --template typescript cd pendu
npm start` 

### JSON source

Créer `src/data/words.json` :

   ```json
   {  "words":  ["ordinateur",  "javascript",  "react",  "programmation",  "elephant"]  }
   ```


----------

# 4. Architecture recommandée

`src/
  components/
    Game.tsx
    Letter.tsx
    WordDisplay.tsx
    Keyboard.tsx
    HangmanDisplay.tsx types/
    LetterState.ts
  data/
    words.json
  App.tsx` 

----------

# 5. Types de base

### `LetterState`

Créer `src/types/LetterState.ts` :
```ts 
export  type  LetterState = { display: string  state: 'Display' | 'Hidden' }` 
```


----------

# 6. Étape 1 : Composant Game – Initialisation du jeu

`Game.tsx` est le cœur du jeu.  
C’est lui qui gère :

-   Le mot à deviner ;
    
-   Les erreurs ;
    
-   Les lettres proposées ;
    
-   La génération de la liste de `LetterState`.
    

### A) Charger un mot depuis le JSON

Dans `useEffect`, charger le JSON et choisir un mot aléatoire :
```ts
const [word, setWord] = useState<string>('');
 useEffect(() => { 
 const words = wordList.words;  
 const random = words[Math.floor(Math.random() * words.length)];
 setWord(random)
},[]) 

```



### B) Générer les LetterState

Quand `word` est défini :
```ts
const [letters, setLetters] = useState<LetterState[]>([]);
useEffect(() => { 
if (word) { 
setLetters(
      word.split('').map(l => ({ display: l, state: 'Hidden' }))
    )
 }
}, [word])` 

```



### C) Erreurs et lettres jouées
```ts
const [errors, setErrors] = useState<number>(0); 
const [playedLetters, setPlayedLetters] = useState<string[]>([]) 
```



----------

# 7. Étape 2 : Gestion d’une lettre sélectionnée

Créer une fonction appelée depuis `Keyboard` :

### A) Ajouter la lettre aux proposées

```ts
const  handleSelectLetter = (letter: string) => { 
if (playedLetters.includes(letter)) 
	return  setPlayedLetters(prev => [...prev, letter]) 

if (word.includes(letter)) { 
setLetters(prev => prev.map(l =>
        l.display === letter ? { ...l, state: 'Display' } : l
      )
    )
  } else { 
  setErrors(prev => prev + 1)
  }
}`

```



### B) Vérifier la fin de partie

Dans un `useEffect`, surveiller les changements :

-   Victoire : `letters.every(l => l.state === 'Display')`
    
-   Défaite : `errors === MAX_ERRORS`
    

----------

# 8. Étape 3 : Composant Letter

`Letter.tsx` affichera **une seule lettre du mot**.

### Props

`interface  LetterProps { letter: LetterState }` 

### Rôle

-   Si `state === "Display"` : afficher la lettre réelle.
    
-   Sinon : afficher `_`
    
-   Possibilité d’ajouter des classes CSS selon l’état.
    

----------

# 9. Étape 4 : Composant WordDisplay

`WordDisplay.tsx` reçoit la liste des `LetterState`.

### Exemple

`<WordDisplay letters={letters} />` 

### Rôle

Afficher un composant `Letter` pour chaque lettre du mot :

`{letters.map((l, i) => ( <Letter  key={i}  letter={l} />
))}` 

----------

# 10. Étape 5 : Composant Keyboard

### Rôle

Afficher un clavier virtuel composé :

-   Soit des lettres A à Z générées dynamiquement ;
    
-   Soit d’un tableau écrit à la main ;
    

### Exemple de génération :

`const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(65 + i).toLowerCase()
)` 

### Props

`interface  KeyboardProps { onSelectLetter: (l: string) => void  playedLetters: string[]
}` 

### Comportement

-   Lorsqu’on clique sur une lettre, appeler `onSelectLetter`
    
-   Désactiver un bouton si la lettre est déjà dans `playedLetters`
    

----------

# 11. Étape 6 : Composant HangmanDisplay

### Props

`interface  HangmanProps { errors: number }` 

### Rôle

Afficher un pendu selon la valeur de `errors`.

Exemples d’implémentation possibles :

-   Une liste de chaînes de texte (Étape 0, Étape 1, Étape 2…)
    
-   Un affichage en ASCII
    
-   Plusieurs petites images
    

Pas besoin de faire artistique pour le TP.

----------

# 12. Étape 7 : Gestion d’une nouvelle partie

Ajouter un bouton dans `Game.tsx` :

`<button onClick={resetGame}>Nouvelle partie</button>` 

### `resetGame`

-   Recharger un nouveau mot
    
-   Vider `playedLetters`
    
-   Réinitialiser `errors`
    
-   Reconstruire la liste de `LetterState`
    

----------

# 13. Étape 8 : Intégration dans App

Dans `App.tsx` :

`import  Game  from  './components/Game'  function  App() { return  <Game />
} export  default  App` 

----------

# 14. Bonus possibles (optionnels)

-   Styliser les états (`Display`, `Hidden`)
    
-   Ajouter un niveau de difficulté
    
-   Afficher les lettres trouvées à côté du clavier
    
-   Gérer un timer
    
-   Ajouter un système de score ou de statistiques