import React from "react";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

import logo from "../assets/images/logo.png";

function AuthGrid({ loadingBarValue, text, children }) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex items-center font-roboto p-2 ">
      <LoadingBar
        loaderSpeed={1000}
        color="#000000"
        height={3}
        progress={loadingBarValue}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      {/* Image */}
      <div className="w-full p-4 border rounded-2xl space-y-5">
        <img src={logo} alt="logo" className="w-16 mx-auto" />
        <h1 className="font-medium text-2xl text-center">{text}</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthGrid;
