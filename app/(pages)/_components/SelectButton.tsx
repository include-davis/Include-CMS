import React, { useState } from 'react';
import useSelectMode from '../_hooks/useSelectMode';

const SelectButton: React.FC = () => {
  const { toggleSelectMode } = useSelectMode();
  const [isSelected, setIsSelected] = useState(false);

  const buttonStyle = {
    fontSize: '12px',
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
    color: isSelected ? '#333' : '#000',
    cursor: 'pointer',
  };

  const handleClick = () => {
    toggleSelectMode();
    setIsSelected(!isSelected);
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleClick}>
        Select
        {isSelected && <span>&#10003;</span>}
      </button>
    </div>
  );
};

export default SelectButton;
