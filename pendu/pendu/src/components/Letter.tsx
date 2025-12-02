import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
  letter: LetterState;
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
  return (
    <span style={{ display: 'inline-block', minWidth: '1rem', margin: '0 .25rem' }}>
      {letter.state === 'Display' ? letter.display : '_'}
    </span>
  );
};

export default Letter;
