import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import WordDisplay from './WordDisplay';
import HangmanDisplay from './HangmanDisplay';
import { LetterState } from '../types/LetterState';
import wordList from '../data/words.json';

export default function Game() {
    const [word, setWord] = useState<string>('');
    const [letters, setLetters] = useState<LetterState[]>([]);
    const [errors, setErrors] = useState<number>(0);
    const [playedLetters, setPlayedLetters] = useState<string[]>([]);
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const MAX_ERRORS = 6;

    //A) Charger un mot depuis le JSON
    useEffect(() => {
        const words = (wordList as any).words as string[]; //on force ts aaccepter que wordList.words existe et soit un tableau de strings
        if (words && words.length > 0) {
            const random = words[Math.floor(Math.random() * words.length)];
            setWord(random);
        }
    }, []);

    // B) Générer les LetterState
    useEffect(() => {
        if (word) {
            setLetters(word.split('').map((l) => ({ display: l, state: 'Hidden' } as LetterState)));
            setErrors(0);
            setPlayedLetters([]);
        }
    }, [word]);

    //Étape 2 : Gestion d’une lettre sélectionnée
    //A) Ajouter la lettre aux proposées
    const handleSelectLetter = (letter: string) => {
        if (status !== 'playing') return; // ne pas jouer si partie finie
        if (playedLetters.includes(letter)) return; // déjà joué

        setPlayedLetters((prev) => [...prev, letter]);

        const lower = letter.toLowerCase();
        if (word.toLowerCase().includes(lower)) {
            // révéler tout
            setLetters((prev) =>
                prev.map((l) => (l.display.toLowerCase() === lower ? { ...l, state: 'Display' } : l))
            );
        } else {
            setErrors((prev) => prev + 1);
        }
    };

    const resetGame = () => {
        const words = (wordList as any).words as string[];
        if (words && words.length > 0) {
            const random = words[Math.floor(Math.random() * words.length)];
            setWord(random);
        }
    };

    // B) Vérifier la fin de partie
    useEffect(() => {
        if (letters.length > 0 && letters.every((l) => l.state === 'Display')) {
            setStatus('won');
        } else if (errors >= MAX_ERRORS) {
            setStatus('lost');
        } else {
            setStatus('playing');
        }
    }, [letters, errors]);

    return (
        <div>
            <h2>Jeu du Pendu</h2>
            
            <HangmanDisplay errors={errors} />
            
            {status === 'won' && <p style={{ color: 'green', fontSize: '20px' }}>Tu as gagné !</p>}
            {status === 'lost' && <p style={{ color: 'red', fontSize: '20px' }}>Perdu ! Le mot était : <strong>{word}</strong></p>}
            
            <p>Erreurs : {errors} / {MAX_ERRORS}</p>
            <button onClick={resetGame}>Nouvelle partie</button>

            <WordDisplay letters={letters} />
            <Keyboard onSelectLetter={handleSelectLetter} playedLetters={playedLetters} />
        </div>
    );
}