import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface Props {
  letters: LetterState[];
}

const WordDisplay: React.FC<Props> = ({ letters }) => {
  return (
    <div aria-label="word" style={{ fontSize: '1.5rem', letterSpacing: '.2rem' }}>
      {letters.map((l, i) => (
        <Letter key={i} letter={l} />
      ))}
    </div>
  );
};

export default WordDisplay;
