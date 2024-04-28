import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { getWrittenMessages, getWrittenComments } from '@/api'
import { useAuthorization } from '@/providers'
import MessageListWritten from '@/components/messages/messageListWritten'
import CommentListWritten from '@/components/comments/commentListWritten'

interface Props {
    dataState: number
}

export function WrittenData({ dataState }: Props) {
    // TODO: query 정보 내부에서 state로 관리
    const searchParams = useSearchParams()
    const [page, setPage] = useState<number>(1)
    const query = {
        page: page,
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }
    const auth = useAuthorization()
    const queryKeyString = dataState ? 'commentListWritten' : 'messageListWritten'
    const { data } = useSuspenseQuery({
        queryKey: [queryKeyString, auth, query, dataState],
        queryFn: () => (dataState ? getWrittenComments(auth, query) : getWrittenMessages(auth, query)),
        refetchOnWindowFocus: false,
    })
    const pageNumbers = Array.from({ length: data.page.totalPages }, (v, i) => i + 1)

    return (
        <div className="p-2">
            <div className="flex flex-col w-full mt-2 space-y-2">
                <div className="pb-3">
                    {'messages' in data ? <MessageListWritten messages={data.messages} /> : <CommentListWritten comments={data.comments} />}
                </div>
            </div>
            {/*TODO: paginate component 분리*/}
            <div className="flex flex-row items-center justify-center mb-2">
                <nav aria-label="Page navigation">
                    <ul className="flex list-style-none">
                        <li>
                            <button
                                onClick={() => setPage(page - 1)}
                                className={`relative block rounded px-3 py-1.5 text-lx transition-all duration-300 ${
                                    data.page.hasPrevPage
                                        ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                        : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
                                }`}
                            >
                                Previous
                            </button>
                        </li>
                        {pageNumbers &&
                            pageNumbers.map(pageNumber => (
                                <li key={pageNumber} aria-current={pageNumber == data.page.page ? 'page' : undefined}>
                                    <button
                                        onClick={() => setPage(pageNumber)}
                                        className={`relative block rounded px-3 py-1.5 me-1 text-lx ${
                                            pageNumber === data.page.page
                                                ? 'pointer-events-none bg-neutral-200 dark:bg-[#ffffff26]'
                                                : 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                        } transition-all duration-300`}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        <li>
                            <button
                                onClick={() => setPage(page + 1)}
                                className={`relative block rounded px-3 py-1.5 text-lx transition-all duration-300 ${
                                    data.page.hasNextPage
                                        ? 'hover:bg-neutral-200 dark:hover:bg-[#ffffff26]'
                                        : 'pointer-events-none text-neutral-300 dark:text-[#818284]'
                                }`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
