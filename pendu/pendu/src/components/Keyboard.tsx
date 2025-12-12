import React from 'react';

interface KeyboardProps {
    onSelectLetter: (letter: string) => void;
    playedLetters: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ onSelectLetter, playedLetters }) => { //recoit les deux props de game.tsx 
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letters = alphabet.map((letter) => {
        const used = playedLetters.includes(letter);
        return (
            <button
                key={letter}
                className={`key ${used ? 'used' : ''}`}
                onClick={() => onSelectLetter(letter)}
                disabled={used}
                aria-label={`Lettre ${letter}`}
            >
                {letter}
            </button>
        );
    });
    return (
        <div className="keyboard">
            {letters}
        </div>
    );
};

export default Keyboard;