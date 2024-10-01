import React from "react";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <div className="join">
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-md ${page === currentPage ? "btn-active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
