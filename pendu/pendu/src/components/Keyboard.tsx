import React from 'react';

interface Props {
  onSelectLetter: (l: string) => void;
  playedLetters: string[];
  disabled?: boolean;
}

const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(65 + i).toLowerCase());

const Keyboard: React.FC<Props> = ({ onSelectLetter, playedLetters, disabled = false }) => {
  return (
    <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', maxWidth: '28rem' }}>
      {alphabet.map((letter) => {
        const isPlayed = playedLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => onSelectLetter(letter)}
            disabled={isPlayed || disabled}
            style={{
              width: '2rem',
              height: '2rem',
              margin: '0.25rem',
              textTransform: 'uppercase',
            }}
            aria-pressed={isPlayed}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
