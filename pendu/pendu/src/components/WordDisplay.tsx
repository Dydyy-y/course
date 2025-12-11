import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface WordDisplayProps {
    letters: LetterState[];
}

// Étape 4 : affiche le mot complet en utilisant un composant Letter par lettre
const WordDisplay: React.FC<WordDisplayProps> = ({ letters }) => {
    return (
        <div style={{ margin: '20px 0', fontSize: '32px' }}>
            {letters.map((l, i) => (
                <Letter key={i} letter={l} />
            ))}
        </div>
    );
};

export default WordDisplay;