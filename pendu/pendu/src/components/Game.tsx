import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import WordDisplay from './WordDisplay';
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

    // Étape 2 : gérer la sélection d'une lettre
    const handleSelectLetter = (letter: string) => {
        if (status !== 'playing') return; // ne pas jouer si partie finie
        // keyboard envoie des lettres en MAJUSCULE, on conserve cette casse pour playedLetters
        if (playedLetters.includes(letter)) return; // déjà joué

        setPlayedLetters((prev) => [...prev, letter]);

        const lower = letter.toLowerCase();
        if (word.toLowerCase().includes(lower)) {
            // révéler toutes les occurrences
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

    // Vérifier victoire / défaite
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
            <h2>Jeu du Pendu — initialisation</h2>
            <p>Mot choisi (debug) : <strong>{word}</strong></p>
            <p>Lettres dans le mot : {letters.length}</p>
            <p>Erreurs : {errors}</p>
            <button onClick={resetGame}>Nouvelle partie</button>

            <WordDisplay letters={letters} />
            <Keyboard onSelectLetter={handleSelectLetter} playedLetters={playedLetters} />
        </div>
    );
}