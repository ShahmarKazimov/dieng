// components/Pagination/Pagination.tsx
"use client";

import Link from "next/link";
import {PaginationProps} from "@/lib/types/pagination.types"
import React from "react";
import { useSearchParams } from "next/navigation";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    pageSize
}) => {
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number, size: number = pageSize) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        params.set('size', size.toString());
        return `?${params.toString()}`;
    };

    // const handlePageSizeChange = (size: number) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('page', '1');
    //     params.set('size', size.toString());
    //     window.location.href = `?${params.toString()}`;
    // };

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={36}>36</option>
                </select>
                <span className="flex whitespace-nowrap">of {totalItems}</span>
            </div> */}

            <div className="flex justify-between w-full items-center gap-1">
                {prevDisabled ? (
                    <span className="px-4 border border-[#464646] py-2 flex items-center gap-x-2 text-sm font-medium text-white bg-[#131825] rounded-lg opacity-50 cursor-not-allowed">
                        <span>
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 13L0.5 7L6.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Previous
                    </span>
                ) : (
                    <Link
                        href={createPageURL(currentPage - 1)}
                        className="px-4 border border-[#464646] py-2 flex items-center gap-x-2 text-sm font-medium text-white bg-[#131825] rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <span>
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 13L0.5 7L6.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Previous
                    </Link>
                )}

                <div className="flex items-center space-x-1">
                    {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="p-2 text-sm text-gray-500">...</span>
                            ) : currentPage === page ? (
                                <span className="p-2 text-[16px] w-10 h-10 font-medium rounded-md border border-[#464646] bg-[#131825] cursor-default text-white flex items-center justify-center">
                                    {page}
                                </span>
                            ) : (
                                <Link
                                    href={createPageURL(Number(page))}
                                    className="p-2 text-[16px] w-10 h-10 font-medium rounded-md bg-[#131825] text-white cursor-pointer hover:border hover:border-[#464646] transition-all flex items-center justify-center"
                                >
                                    {page}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {nextDisabled ? (
                    <span className="px-4 border border-[#464646] py-2 flex items-center gap-x-2 text-sm font-medium text-white bg-[#131825] rounded-lg opacity-50 cursor-not-allowed">
                        Next
                        <span>
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 13L6.5 7L0.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </span>
                ) : (
                    <Link
                        href={createPageURL(currentPage + 1)}
                        className="px-4 border border-[#464646] py-2 flex items-center gap-x-2 text-sm font-medium text-white bg-[#131825] rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        Next
                        <span>
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 13L6.5 7L0.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Pagination;