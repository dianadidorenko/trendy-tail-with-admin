import React from "react";

const CustomButton = ({ text, containerStyles }) => {
  return (
    <button
      className={`${containerStyles} group relative cursor-pointer overflow-hidden bg-redColor p-2 rounded-full border-2 shadow-lg`}
    >
      {/* animation */}
      <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-[#f04340] transition-all duration-500 group-hover:h-64 group-hover:-translate-y-32"></span>
      <span className="ease relative text-white transition duration-500 group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
