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
                                    ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                    : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
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
                                            ? 'pointer-events-none bg-neutral-200 dark:bg-[#ffffff26]'
                                            : 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
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
                                    ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                    : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
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
