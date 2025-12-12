import { useEffect, useState } from 'react';
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

    // Difficulté : influence le nombre d'erreurs autorisées et longueur des mots
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const MAX_ERRORS = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 6 : 4;

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

    const pickRandomWord = (wordsArray: string[]) => {
        if (!wordsArray || wordsArray.length === 0) return '';
        return wordsArray[Math.floor(Math.random() * wordsArray.length)];
    };

    const resetGame = (newDifficulty?: 'easy' | 'medium' | 'hard') => {
        if (newDifficulty) setDifficulty(newDifficulty);
        const words = (wordList as any).words as string[];
        if (!words || words.length === 0) return;

        // Filtrer par longueur selon la difficulté
        const filtered = words.filter((w) => {
            const len = w.length;
            if ((newDifficulty || difficulty) === 'easy') return len <= 6;
            if ((newDifficulty || difficulty) === 'medium') return len >= 5 && len <= 9;
            return len >= 8; // hard
        });

        const chosen = pickRandomWord(filtered.length ? filtered : words);
        setWord(chosen);
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
    }, [letters, errors, MAX_ERRORS]);

    // Lettres trouvées (uniques, en majuscules)
    const foundLetters = Array.from(
        new Set(letters.filter((l) => l.state === 'Display').map((l) => l.display.toUpperCase()))
    );

    return (
        <div className="game-panel" style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Jeu du Pendu</h2>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <label style={{ fontWeight: 600 }}>Difficulté :</label>
                <select value={difficulty} onChange={(e) => resetGame(e.target.value as any)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={() => resetGame()}>Nouvelle partie</button>
            </div>

            <HangmanDisplay errors={errors} />

            {status === 'won' && <p style={{ color: 'green', fontSize: '20px' }}>🎉 Bravo ! Tu as gagné !</p>}
            {status === 'lost' && <p style={{ color: 'red', fontSize: '20px' }}>😢 Perdu ! Le mot était : <strong>{word}</strong></p>}

            <p>Erreurs : {errors} / {MAX_ERRORS}</p>

            <WordDisplay letters={letters} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Keyboard onSelectLetter={handleSelectLetter} playedLetters={playedLetters} />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <strong style={{ display: 'block', marginBottom: 8 }}>Lettres trouvées :</strong>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        {foundLetters.length === 0 ? (
                            <span style={{ color: '#666' }}>Aucune</span>
                        ) : (
                            foundLetters.map((ch) => (
                                <span key={ch} className="letter display">{ch}</span>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}