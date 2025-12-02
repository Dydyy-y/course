import React, { useEffect, useState } from 'react';
import wordList from '../data/words.json';
import { LetterState } from '../types/LetterState';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import HangmanDisplay from './HangmanDisplay';

const MAX_ERRORS = 6;

type GameStatus = 'playing' | 'won' | 'lost';

const Game: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [letters, setLetters] = useState<LetterState[]>([]);
  const [playedLetters, setPlayedLetters] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('playing');

  useEffect(() => {
    const words = (wordList as any).words as string[];
    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random);
  }, []);

  useEffect(() => {
    if (word) {
      setLetters(word.split('').map((l) => ({ display: l, state: 'Hidden' })));
      setPlayedLetters([]);
      setErrors(0);
      setStatus('playing');
    }
  }, [word]);

  const handleSelectLetter = (letter: string) => {
    if (status !== 'playing') return;
    if (playedLetters.includes(letter)) return;
    setPlayedLetters((prev) => [...prev, letter]);
    if (word.includes(letter)) {
      setLetters((prev) => prev.map((l) => (l.display === letter ? { ...l, state: 'Display' } : l)));
    } else {
      setErrors((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (letters.length > 0 && letters.every((l) => l.state === 'Display')) {
      setStatus('won');
    }
  }, [letters]);

  useEffect(() => {
    if (errors >= MAX_ERRORS) setStatus('lost');
  }, [errors]);

  const resetGame = () => {
    const words = (wordList as any).words as string[];
    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Pendu</h1>
      <HangmanDisplay errors={errors} />
      <WordDisplay letters={letters} />

      <div style={{ marginTop: '1rem', minHeight: '2rem' }}>
        {status === 'won' && <div style={{ color: 'green' }}>Vous avez gagné !</div>}
        {status === 'lost' && (
          <div style={{ color: 'crimson' }}>
            Vous avez perdu… Le mot était : <strong>{word}</strong>
          </div>
        )}
      </div>

      <Keyboard onSelectLetter={handleSelectLetter} playedLetters={playedLetters} disabled={status !== 'playing'} />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={resetGame}>Nouvelle partie</button>
      </div>
    </div>
  );
};

export default Game;
