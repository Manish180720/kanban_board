import React, { useState } from "react";
import "./Navbar.css"; // Import your CSS file

function Navbar({
  groupingOption,
  setGroupingOption,
  sortedBy,
  setSortedBy,
  groupingOptions,
  sortingOptions,
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionChange = (e, optionType) => {
    if (optionType === "grouping") {
      setGroupingOption(e.target.value);
    } else if (optionType === "sorting") {
      setSortedBy(e.target.value);
    }
  };

  return (
    <div className="button-wrapper">
      <button
        className={`button ${isDropdownVisible ? "active" : ""}`}
        onClick={toggleDropdown}
      >
        Display
      </button>
      {isDropdownVisible && (
        <div className="custom-dropdown">
          <select
            value={groupingOption}
            onChange={(e) => handleOptionChange(e, "grouping")}
          >
            {groupingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={sortedBy}
            onChange={(e) => handleOptionChange(e, "sorting")}
          >
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Navbar;
