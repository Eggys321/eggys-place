const MyButton = ({ text, className = "", onClick, disabled, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        disabled
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-[#B67B0F] cursor-pointer"
      } text-[#FBFBFB] rounded-[31px] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
