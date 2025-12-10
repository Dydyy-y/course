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

    //A) Charger un mot depuis le JSON
    useEffect(() => {
        const words = (wordList as any).words as string[];
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

    //pas encore selection, faire a étape 2 !!!!
    const handleSelectLetter = (letter: string) => {
        console.log('lettre sélectionnée (à gérer à l\'étape 2):', letter);
    };

    const resetGame = () => {
        const words = (wordList as any).words as string[];
        if (words && words.length > 0) {
            const random = words[Math.floor(Math.random() * words.length)];
            setWord(random);
        }
    };

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