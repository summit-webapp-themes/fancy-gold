import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';

const BulkDropdownInput = ({
  dropdownData,
  inputValue,
  setInputValue,
  disabled,
  name,
  value,
  onChange,
  fetchItemDetails,
  keyBunch,
}: any) => {
  const { refCodesList }: any = useBulkOrder();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value, setInputValue]);

  const handleInputChange = (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    if (value === '' || !value || value.length === 0) {
      setFilteredData([...dropdownData]);
    } else {
      const filtered = dropdownData.filter((item: any) => item.toLowerCase().includes(value));
      setFilteredData(filtered.length > 0 ? filtered : ['No Data Found']);
    }

    setSelectedIndex(-1);
    onChange(value);
  };

  const handleOnFocus = () => {
    setDropdownVisible(true);
    if (inputRef.current && inputRef.current.value === '') {
      setFilteredData(dropdownData); // Reset filtered data when input is empty
    }

    // Calculate and set the dropdown's position relative to the input field
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY, // Account for scrolling
        left: rect.left + window.scrollX, // Account for scrolling
        width: rect.width,
      });
    }
  };

  const handleKeyDown = (e: any) => {
    if (filteredData.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 'Enter':
        if (selectedIndex !== -1) {
          handleSelect(filteredData[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const handleSelect = (referenceCode: string) => {
    const selectedItem = refCodesList.find((item: any) => item.reference_code === referenceCode);
    if (selectedItem) {
      const itemCode = selectedItem.item_code;
      setInputValue(referenceCode);
      setDropdownVisible(false);
      setSelectedIndex(-1);
      onChange(itemCode);
      if (keyBunch === 'is_bunch') {
        fetchItemDetails(itemCode);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

  // Create the dropdown component with portal support
  const dropdownComponent = dropdownVisible && (
    <div
      className="dropdown dropdown-container border bg-white"
      style={{
        position: 'absolute',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        height: '175px',
        overflowY: 'auto',
        zIndex: 10000, // Ensure it's on top
      }}
      ref={dropdownRef}
    >
      {filteredData?.length > 0 && (
        <>
          {filteredData?.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className={` ${selectedIndex === index ? 'selected bg-info text-white' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '7px',
                textAlign: 'start',
                color: '#000',
                fontSize: '12px',
              }}
            >
              {item}
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        className="form-control position-relative"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleOnFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        ref={inputRef}
        name={name}
        autoComplete="off"
        style={{ width: '240px' }}
      />
      {createPortal(dropdownComponent, document.body)}
    </div>
  );
};

export default BulkDropdownInput;
