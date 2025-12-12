import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface WordDisplayProps {
    letters: LetterState[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ letters }) => {
    return (
        <div className="word-display" aria-hidden={letters.length === 0}>
            {letters && letters.length > 0 ? (
                letters.map((l, i) => <Letter key={i} letter={l} />)
            ) : (
                <p style={{ color: 'rgba(0,255,65,0.25)' }}>WordDisplay</p>
            )}
        </div>
    );
};

export default WordDisplay;