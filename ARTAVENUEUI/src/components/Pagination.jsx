import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav aria-label="Page Navigation" className="mx-auto my-10 flex max-w-md justify-between space-x-2 rounded-md bg-white py-2 text-gray-700">
      <a 
        className={`flex items-center space-x-1 font-medium ${currentPage === 1 ? 'text-gray-400' : 'hover:text-blue-600'}`} 
        aria-label="Previous Page" 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} 
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
        </svg>
      </a>
      <ul className="flex">
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <a 
              href="#" 
              className={`rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'px-2 text-lg font-medium hover:text-blue-600'}`} 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index + 1);
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
      <a 
        className={`flex items-center space-x-1 font-medium ${currentPage === totalPages ? 'text-gray-400' : 'hover:text-blue-600'}`} 
        href="#" 
        aria-label="Next Page" 
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} 
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>
      </a>
    </nav>
  );
};

export default Pagination;
