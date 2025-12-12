import React from 'react';

interface HangmanProps {
    errors: number; //nb error actuel
}

//Étape 6 : Composant HangmanDisplay
//Afficher un pendu selon la valeur de `errors`.
const HangmanDisplay: React.FC<HangmanProps> = ({ errors }) => {
    const stages = [
        '🙂 Début de la partie',
        '😐 1ère erreur',
        '😕 2ème erreur',
        '😟 3ème erreur',
        '😧 4ème erreur',
        '😰 5ème erreur',
        '💀 6ème erreur - PERDU !'
    ];

    const text = stages[errors] || stages[stages.length - 1];
    return (
        <div className="hangman-display" role="status" aria-live="polite">
            <p style={{ margin: 0 }}>{text}</p>
        </div>
    );
};

export default HangmanDisplay;