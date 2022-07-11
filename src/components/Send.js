import React from "react";

function Send() {
  return (
    <div className="w-full flex justify-center px-9 bg-gray-600 rounded-xl hover:bg-gray-600 transition duration-300">
      <button
        disabled
        className="cursor-not-allowed text-white h-11 flex items-center"
      >
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sedang mengirim
      </button>
    </div>
  );
}

export default Send;
