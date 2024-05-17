import useSelectMode from '../_hooks/useSelectMode';

const SelectButton: React.FC = () => {
  const { selectMode, toggleSelectMode } = useSelectMode();

  const buttonStyle = {
    fontSize: '12px',
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: selectMode ? '#f0f0f0' : 'transparent',
    color: selectMode ? '#333' : '#000',
    cursor: 'pointer',
  };

  return (
    <div>
      <button style={buttonStyle} onClick={toggleSelectMode}>
        Select
        {selectMode && <span>&#10003;</span>}
      </button>
    </div>
  );
};

export default SelectButton;
