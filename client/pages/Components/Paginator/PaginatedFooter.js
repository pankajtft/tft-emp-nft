import React, { useEffect } from "react";

const TableFooter = ({onPrevButton,onNextButton , pages, isDisabled}) => {
  return (
<div class="flex flex-col items-center bg-gray-50">
  <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">5</span> of <span class="font-semibold text-gray-900 dark:text-white">{pages}</span> Entries
  </span>
  <div class="flex flex-row justify-around">
      <button 
      onClick={onPrevButton}
      class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
      </button>
      <button 
      onClick={onNextButton}
      class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
      </button>
  </div>
</div>

  );
};

export default TableFooter;