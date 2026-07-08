import React from "react";
import { Button } from "./ui";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <Button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        variant="ghost"
        className="border border-gray-300 bg-gray-100 text-gray-700 rounded-r-none hover:bg-gray-200"
      >
        Previous
      </Button>
      <span className="px-4 py-2 border-t border-b border-gray-300 bg-gray-100 text-gray-700">
        {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        variant="ghost"
        className="border border-gray-300 bg-gray-100 text-gray-700 rounded-l-none hover:bg-gray-200"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
