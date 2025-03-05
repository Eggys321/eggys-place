import arrowDown from "../assets/drop-down-img.svg";
import arrowUp from "../assets/arrow-up.svg";
import { useState } from "react";

export const LocationDropDownFN = () => {
  const [isClicked, setIsClicked] = useState(false);
  function toggleArrow() {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  }
  return (
    <>
      <div className="dropdown dropdown-center ">
        <div tabIndex={0} className=" m-1" onClick={toggleArrow}>
          <img
            src={isClicked  ? arrowUp :   arrowDown}
            alt="drop-down-img"
            className="cursor-pointer min-w-2"
            
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-35 p-2 shadow-sm mt-5"
        >
          <li>
            <a>Delta</a>
          </li>
          <li>
            <a> Lagos</a>
          </li>
        </ul>
      </div>
    </>
  );
};
