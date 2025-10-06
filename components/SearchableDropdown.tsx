import React, { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  dropdownData,
  inputValue,
  setInputValue,
  disabled,
}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null); // Ref for dropdown container
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    setFilteredData([...dropdownData]);
  }, [dropdownData]);

  // Function to scroll the selected item into view
  const scrollIntoView = () => {
    if (selectedIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: "auto", block: "nearest" });
      }
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "" || !value || value?.length === 0) {
      setFilteredData([...dropdownData]);
    } else {
      const filtered = dropdownData.filter((item: any) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered.length > 0 ? filtered : ["Data Not Found"]);
      setSelectedIndex(-1);
    }
  };

  const handleOnFocus: any = (e: any) => {
    setDropdownVisible(true);
  };

  const handleInputClick = () => {
    setDropdownVisible(true);
  };

  const handleKeyDown = (e: any) => {
    if (filteredData.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
        );
        scrollIntoView();
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        scrollIntoView();
        break;
      case "Enter":
        if (selectedIndex !== -1) {
          handleSelect(filteredData[selectedIndex]);
        }
        break;
      case "Tab":
        setDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (value: any) => {
    setInputValue(value);
    setDropdownVisible(false);
    setSelectedIndex(-1);
  };

  const handleInputClear = () => {
    setInputValue("");
    setDropdownVisible(true);
    setSelectedIndex(-1);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (inputRef.current.value === "") {
        handleInputClear();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control position-relative"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onKeyUp={handleKeyUp}
        placeholder="Search..."
        ref={inputRef}
        disabled={disabled}
      />
      {dropdownVisible && (
        <div
          className="dropdown dropdown-container border position-absolute bg-white"
          style={{
            width: inputRef.current.offsetWidth,
            height: "175px",
            overflowY: "scroll",
          }}
          ref={dropdownRef} // Assign the ref to the dropdown container
        >
          {filteredData?.length > 0 && (
            <>
              {filteredData?.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={` ${
                    selectedIndex === index ? "selected bg-info text-white" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    padding: "7px",
                    textAlign: "start",
                    color: "#000",
                    fontSize: "12px",
                  }}
                >
                  {item}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
