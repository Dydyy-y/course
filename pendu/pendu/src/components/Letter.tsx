import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
    letter: LetterState;
}

// Étape 3 : affiche UNE seule lettre du mot
// Si state === 'Display' → affiche la lettre réelle
// Sinon → affiche un underscore _
const Letter: React.FC<LetterProps> = ({ letter }) => {
    return (
        <span style={{ margin: '0 5px', fontSize: '24px', fontWeight: 'bold' }}>
            {letter.state === 'Display' ? letter.display : '_'}
        </span>
    );
};

export default Letter;