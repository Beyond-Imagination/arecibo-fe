import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
}

export default function Paginate({ page }: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const pageNumbers = Array.from({ length: page.totalPages }, (v, i) => i + 1)

    const createQueryString = useCallback(
        (pageNum: number) => {
            const params = new URLSearchParams(searchParams)
            params.set('page', pageNum.toString())

            return params.toString()
        },
        [searchParams],
    )

    return (
        <div className="flex flex-row items-center justify-center mb-2">
            <nav aria-label="Page navigation">
                <ul className="flex list-style-none">
                    <li>
                        <Link
                            href={pathname + '?' + createQueryString(page.page - 1)}
                            className={`relative block rounded px-3 py-1.5 text-lx transition-all duration-300 ${
                                page.hasPrevPage
                                    ? 'text-neutral-600 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-500 dark:hover:text-white'
                                    : 'pointer-events-none text-neutral-300 dark:text-neutral-400'
                            }`}
                        >
                            Previous
                        </Link>
                    </li>
                    {pageNumbers &&
                        pageNumbers.map(pageNumber => (
                            <li key={pageNumber} aria-current={pageNumber == page.page ? 'page' : undefined}>
                                <Link
                                    href={pathname + '?' + createQueryString(pageNumber)}
                                    className={`relative block rounded px-3 py-1.5 me-1 text-lx ${
                                        pageNumber === page.page
                                            ? 'pointer-events-none text-neutral-600 bg-neutral-200 dark:text-white dark:bg-neutral-500'
                                            : 'text-neutral-600 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-500 dark:hover:text-white'
                                    } transition-all duration-300`}
                                >
                                    {pageNumber}
                                </Link>
                            </li>
                        ))}
                    <li>
                        <Link
                            href={pathname + '?' + createQueryString(page.page + 1)}
                            className={`relative block rounded px-3 py-1.5 text-lx transition-all duration-300 ${
                                page.hasNextPage
                                    ? 'text-neutral-600 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-500 dark:hover:text-white'
                                    : 'pointer-events-none text-neutral-300 dark:text-neutral-400'
                            }`}
                        >
                            Next
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
