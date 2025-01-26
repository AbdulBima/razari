import React from "react";

const Loader = () => {
  return (
    <div className="flex w-full justify-center items-center h-auto">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
    </div>
  );
};

export default Loader;
