import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="px-3 py-2 rounded bg-gray-100 flex cursor-pointer items-center">
        <IoIosArrowBack />
        Prev
      </div>
      <div className="flex items-center gap-1">
        Page
        <div className="px-3 py-1 rounded bg-gray-100 flex cursor-pointer items-center">
          1
        </div>
        of 1
      </div>
      <div className="px-3 py-2 rounded bg-gray-100 flex cursor-pointer items-center">
        Next
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Pagination;
