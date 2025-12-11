import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
    letter: LetterState;
}

//Étape 3 : Composant Letter 
// affiche UNE seule lettre du mot
//Si `state === "Display"` : afficher la lettre réelle.
//Sinon : afficher `_`

const Letter: React.FC<LetterProps> = ({ letter }) => {
    return (
        <span style={{ margin: '0 5px', fontSize: '24px', fontWeight: 'bold' }}>
            {letter.state === 'Display' ? letter.display : '_'}
        </span>
    );
};

export default Letter;