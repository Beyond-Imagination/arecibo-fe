import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { getWrittenMessages, getWrittenComments } from '@/api'
import { useAuthorization } from '@/providers'
import MessageListWritten from '@/components/messages/messageListWritten'
import CommentListWritten from '@/components/comments/commentListWritten'
import Paginate from '@/components/paginate'

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

    return (
        <div className="p-2">
            <div className="flex flex-col w-full mt-2 space-y-2">
                <div className="pb-3">
                    {'messages' in data ? <MessageListWritten messages={data.messages} /> : <CommentListWritten comments={data.comments} />}
                </div>
            </div>
            <Paginate page={data.page} setPage={setPage} />
        </div>
    )
}
