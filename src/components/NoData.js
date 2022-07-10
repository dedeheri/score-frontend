import React from "react";

// image
import { RiInboxLine } from "react-icons/ri";

function NoData() {
  return (
    <div className="max-w-3xl mt-32 mx-auto flex justify-center">
      <div className="text-gray-400 space-y-4">
        <RiInboxLine fontSize={120} className="mx-auto" />
        <h1 className="text-3xl md:text-4xl">Data akan di munculkan disini</h1>
      </div>
    </div>
  );
}

export default NoData;
