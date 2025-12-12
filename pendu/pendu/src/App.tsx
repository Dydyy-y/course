import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App-header">
      <div style={{ width: '100%' }}>
        <header>
          <h1>Pendu en React</h1>
        </header>
        <main>
          <Game />
        </main>
      </div>
    </div>
  );
}

export default App;
