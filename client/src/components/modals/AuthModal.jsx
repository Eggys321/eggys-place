import { useState } from "react";
import SignIn from "../../auth/SignIn";
import SignUp from "../../auth/SignUp";
import navLogo from "../../assets/nav-logo.svg";

const AuthModal = ({ text }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  function closeModal() {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  }
  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        {text}
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-[#100101]">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="text-end cursor-pointer text-white w-full block"
          >
            X
          </button>
          <div className="flex justify-center">
            <img src={navLogo} alt="nav-logo" />
          </div>
          {isSignUp ? <SignUp switchToSignIn={() => setIsSignUp(false)} /> : <SignIn switchToSignUp={() => setIsSignUp(true)} />}
        </div>
      </dialog>
    </>
  );
};

export default AuthModal;
