import React, { useState } from 'react';
import './NestedDropdown.css';

const NestedDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="nested-dropdown">
      <div className="selected-option">
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      <ul className="options-list">
        {options.map((option) => (
          <li key={option.id} onClick={() => handleOptionClick(option)}>
            {option.label}
            {option.children && (
              <NestedDropdown options={option.children} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NestedDropdown;