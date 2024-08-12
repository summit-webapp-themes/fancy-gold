import React, { useState } from 'react';

const SearchableDropdown = ({ options, onSelect }:any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options?.filter((option:any) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option:any) => {
    onSelect(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <input
        type="text"
        className='form-control'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onClick={() => setIsOpen(!isOpen)}
        placeholder="Search Product"
      />
      {isOpen && (
        <ul className="dropdown-list">
          {filteredOptions.map((option:any, index:number) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="dropdown-item"
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="dropdown-no-options">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
