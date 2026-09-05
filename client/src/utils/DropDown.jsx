import arrowDown from "../assets/drop-down-img.svg";
import arrowUp from "../assets/arrow-up-2.png";
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
      <div className="dropdown dropdown-center " onClick={toggleArrow}>
        <div tabIndex={0} className=" m-1"  >
          <img
            src={isClicked  ? arrowUp :   arrowDown}
            alt="drop-down-img"
            className="cursor-pointer min-w-3"

          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu  rounded-box z-1 w-25 h-30 text-[#FBFBFB] p-2 shadow-sm mt-5 bg-[#252422]"
        >
          <li>
            <a onClick={() => handleSelect("Lagos")}>Lagos</a>
          </li>
          <li>
            <a onClick={() => handleSelect("Delta")}>Delta</a>
          </li>
          <li>
            <a onClick={() => handleSelect("Abuja")}>Abuja</a>
          </li>
        </ul>
      </div>
    </>
  );
};
