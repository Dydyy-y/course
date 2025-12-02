import React from 'react';

interface Props {
  errors: number;
}

const steps = [
  'Aucun coup',
  'Tête',
  'Corps',
  'Bras gauche',
  'Bras droit',
  'Jambe gauche',
  'Jambe droite',
];

const HangmanDisplay: React.FC<Props> = ({ errors }) => {
  const clamped = Math.max(0, Math.min(errors, steps.length - 1));
  return (
    <div aria-label="hangman" style={{ marginBottom: '1rem' }}>
      <div>Erreurs : {errors}</div>
      <div>{steps[clamped]}</div>
    </div>
  );
};

export default HangmanDisplay;
