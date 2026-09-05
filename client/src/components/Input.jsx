const Input = ({ name, id, "aria-label": ariaLabel, placeholder, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      id={id || name}
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
      className="bg-[#201F1E] w-full h-[43px] ps-4 outline-none rounded-[6px] placeholder:text-[#FBFBFB] text-[#FBFBFB] text-[16px] font-[400]"
    />
  );
};

export default Input;
