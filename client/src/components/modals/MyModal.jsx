import logOutImg from "../../assets/warning-img.png";
import { useAuth } from "../../context/AuthContext";

export const LOGOUT_MODAL_ID = "logout_confirm_modal";

const MyModal = () => {
  const { logout } = useAuth();

  return (
    <dialog id={LOGOUT_MODAL_ID} className="modal">
      <div className="modal-box bg-[#100101] w-100 flex flex-col gap-5 items-center">
        <img src={logOutImg} alt="" />
        <h2 className="text-[#FFFFFF]">Log Out</h2>
        <p className="text-[#FFFFFF]">Are you sure you want to log out?</p>
        <div className="flex gap-5 ">
          <button type="button" className="cursor-pointer text-red-500" onClick={logout}>
            Logout
          </button>
          <button
            type="button"
            className="cursor-pointer text-white"
            onClick={() => document.getElementById(LOGOUT_MODAL_ID).close()}
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};

export default MyModal;
