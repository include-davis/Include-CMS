import React from 'react';
import useSelectMode from '../_hooks/useSelectMode';

const SelectButton: React.FC = () => {
  const { toggleSelectMode } = useSelectMode();

  const handleClick = () => {
    toggleSelectMode();
  };

  return (
    <button onClick={handleClick}>
      Toggle Select Mode
    </button>
  );
};

export default SelectButton;