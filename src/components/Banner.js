import React from "react";

// https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6
import welcomeImage from "../assets/images/welcome.png";

function Banner({ name, isFetching }) {
  return (
    <div className="bg-blue-100 h-40 md:h-80 rounded-xl items-center flex justify-between px-6">
      <div className="md:ml-8 ml-2 space-y-3">
        <p className="font-bold text-1xl md:text-2xl lg:text-3xl">
          Selamat Datang,
        </p>
        {isFetching ? (
          <div className="bg-gray-300 animate-pulse rounded-lg h-10 w-32 "></div>
        ) : (
          <p className="font-bold text-3xl md:text-4xl lg:text-5xl">{name}</p>
        )}
      </div>
      <img src={welcomeImage} className="w-1/3" alt={"Welcome"} />
    </div>
  );
}

export default Banner;
