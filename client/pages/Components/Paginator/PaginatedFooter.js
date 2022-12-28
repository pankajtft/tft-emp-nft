import React, { useEffect } from "react";

const TableFooter = ({onPrevButton,onNextButton , pageNo, next}) => {
  return (
<div className="flex flex-col items-center bg-gray-50">
  <div className="flex flex-row justify-between p-5 w-full ">
      {<button 
      onClick={onPrevButton}
      className="px-4 py-2 text-sm font-medium hover:border-purple-700 text-white bg-purple-700 border-gray-700 border rounded-l hover:bg-white dark:bg-gray-800 dark:border-purple-700 dark:text-purple-700 dark:hover:bg-white dark:hover:text-purple-700 hover:text-purple-700">
          Prev
      </button>}
      {<button 
      onClick={onNextButton}
      className="px-4 py-2 text-sm font-medium hover:border-purple-700 text-white bg-purple-700 border border-gray-700 rounded-r hover:bg-white dark:bg-gray-800 dark:border-purple-700 dark:text-purple-700 dark:hover:bg-white dark:hover:text-purple-700 hover:text-purple-700">
          Next
      </button>}
  </div>
</div>

  );
};

export default TableFooter;