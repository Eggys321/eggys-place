import arrowDown from "../assets/drop-down-img.svg";
import arrowUp from "../assets/drop-up-img.svg";
import { useState } from "react";

export const LocationDropDownFN = ({ onSelect } = {}) => {
  const [isClicked, setIsClicked] = useState(false);
  function toggleArrow() {
    setIsClicked((prev) => !prev);
  }

  function handleSelect(location) {
    localStorage.setItem("userLocation", location);
    setIsClicked(false);
    if (onSelect) {
      onSelect(location);
    }
  }

  return (
    <>
      <div className="dropdown dropdown-center ">
        <button
          type="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={isClicked}
          aria-label="Toggle location menu"
          className=" m-1"
          onClick={toggleArrow}
        >
          <img
            src={isClicked ? arrowUp : arrowDown}
            alt=""
            className="cursor-pointer min-w-3"
          />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-1 w-25 h-30 text-[#FBFBFB] p-2 shadow-sm mt-5 bg-[#252422]"
        >
          <li>
            <button type="button" onClick={() => handleSelect("Lagos")}>Lagos</button>
          </li>
          <li>
            <button type="button" onClick={() => handleSelect("Delta")}>Delta</button>
          </li>
          <li>
            <button type="button" onClick={() => handleSelect("Abuja")}>Abuja</button>
          </li>
        </ul>
      </div>
    </>
  );
};
