import { Dispatch, SetStateAction, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from '@/icon'

interface Props {
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
    setPage: Dispatch<SetStateAction<number>>
}

export default function Paginate({ page, setPage }: Props) {
    const { startPage, endPage, pageNumbers } = useMemo(() => {
        const visiblePages = 3
        const startPage = Math.max(1, Math.min(page.totalPages - visiblePages + 1, Math.max(1, page.page - Math.floor(visiblePages / 2))))
        const endPage = Math.min(page.totalPages, startPage + visiblePages - 1)
        const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

        return { startPage, endPage, pageNumbers }
    }, [page.page, page.totalPages])

    return (
        <div className="flex flex-row items-center justify-center mb-2">
            <nav aria-label="Page navigation">
                <ul className="flex list-style-none">
                    <li>
                        <button
                            onClick={() => setPage(page.page - 1)}
                            className={`flex relative rounded items-center text-lx pe-3 py-1.5 transition-all duration-300 ${
                                page.hasPrevPage
                                    ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                    : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
                            }`}
                        >
                            <ChevronLeft />
                            <p>Previous</p>
                        </button>
                    </li>
                    {startPage > 1 && (
                        <li>
                            <button
                                onClick={() => setPage(1)}
                                className={`relative block rounded text-lx px-3 py-1.5 mx-1 ${
                                    1 === page.page
                                        ? 'pointer-events-none bg-neutral-200 dark:bg-[#ffffff26]'
                                        : 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                } transition-all duration-300`}
                            >
                                1
                            </button>
                        </li>
                    )}
                    {startPage > 2 && (
                        <li>
                            <span>...</span>
                        </li>
                    )}
                    {pageNumbers.map(pageNumber => (
                        <li key={`paginate-${pageNumber}`} aria-current={pageNumber === page.page ? 'page' : undefined}>
                            <button
                                onClick={() => setPage(pageNumber)}
                                className={`relative block rounded text-lx px-3 py-1.5 mx-1 ${
                                    pageNumber === page.page
                                        ? 'pointer-events-none bg-neutral-200 dark:bg-[#ffffff26]'
                                        : 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                } transition-all duration-300`}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    {endPage < page.totalPages - 1 && (
                        <li>
                            <span className="mx-2">...</span>
                        </li>
                    )}
                    {endPage < page.totalPages && (
                        <li>
                            <button
                                onClick={() => setPage(page.totalPages)}
                                className={`relative block rounded text-lx px-3 py-1.5 mx-1 ${
                                    page.totalPages === page.page
                                        ? 'pointer-events-none bg-neutral-200 dark:bg-[#ffffff26]'
                                        : 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                } transition-all duration-300`}
                            >
                                {page.totalPages}
                            </button>
                        </li>
                    )}
                    <li>
                        <button
                            onClick={() => setPage(page.page + 1)}
                            className={`flex relative rounded items-center text-lx ps-3 py-1.5 transition-all duration-300 ${
                                page.hasNextPage
                                    ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                    : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
                            }`}
                        >
                            <p>Next</p>
                            <ChevronRight />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
