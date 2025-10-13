import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <ul className="flex items-center space-x-2">
      {/* Prev */}
      <li>
        <button
          className="px-4 py-2 border rounded-md hover:enabled:bg-gray-300 dark:text-dark-primary-default disabled:opacity-80"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li key={page}>
          <button
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page
                ? "bg-dark-primary-default text-white border-none"
                : "hover:bg-gray-300 dark:text-dark-primary-default"
            }`}
          >
            {page}
          </button>
        </li>
      ))}

      {/* Next */}
      <li>
        <button
          className="px-4 py-2 border rounded-md hover:enabled:bg-gray-300 dark:text-dark-primary-default disabled:opacity-80"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
