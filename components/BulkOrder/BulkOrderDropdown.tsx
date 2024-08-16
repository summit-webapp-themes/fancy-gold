import React, { useEffect, useRef, useState } from "react";

const BulkDropdownInput = ({
  dropdownData,
  inputValue,
  setInputValue,
  name,
  value,
  onChange,
  fetchItemDetails,
  keyBunch,
  refCodesList
}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null); // Ref for dropdown container
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {}, [dropdownData]);

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value, setInputValue]);

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
    const value = e.target.value.toLowerCase();

    setInputValue(value);

    if (value === "" || !value || value.length === 0) {
      setFilteredData([...dropdownData]);
    } else {
      const filtered = dropdownData.filter((item: any) =>
        item.toLowerCase().includes(value)
      );

      setFilteredData(filtered.length > 0 ? filtered : ["No Data Found"]);
    }

    setSelectedIndex(-1);
    onChange(value);
  };

  const handleOnFocus: any = (e: any) => {
    setDropdownVisible(true);

    if (inputRef.current && inputRef.current.value === "") {
      setFilteredData(dropdownData); // Reset filtered data when input is empty
    }
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

  const handleSelect = (referenceCode: string) => {
    // Find the corresponding item_code for the selected reference code
    const selectedItem = refCodesList.find(
      (item: any) => item.reference_code === referenceCode
    );
    if (selectedItem) {
      // Extract the item_code value
      const itemCode = selectedItem.item_code;
      // Update the state with the selected item_code
      setInputValue(referenceCode);
      setDropdownVisible(false);
      setSelectedIndex(-1);

      onChange(itemCode); // Trigger any onChange event if needed
      if (keyBunch === "is_bunch") {
        fetchItemDetails(itemCode);
      }
    }
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

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
        // disabled={disabled}
        name={name}
        autoComplete="off"
        style={{height:'1.5rem'}}
      />
      {dropdownVisible && (
        <div
          className="dropdown dropdown-container border position-absolute bg-white"
          style={{
            width: inputRef.current.offsetWidth,
            height: "175px",
            overflowY: "scroll",
            zIndex: "1",
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

export default BulkDropdownInput;
