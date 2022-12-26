import React, { useEffect } from "react";

const TableFooter = ({onPrevButton,onNextButton , pages, isDisabled}) => {
  return (
<div className="flex flex-col items-center bg-gray-50">
  <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">5</span> of <span className="font-semibold text-gray-900 dark:text-white">{pages}</span> Entries
  </span>
  <div className="flex flex-row justify-around">
      <button 
      onClick={onPrevButton}
      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
      </button>
      <button 
      onClick={onNextButton}
      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
      </button>
  </div>
</div>

  );
};

export default TableFooter;