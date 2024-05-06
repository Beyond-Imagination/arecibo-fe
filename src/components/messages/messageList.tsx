import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuthorization } from '@/providers'
import { getMessages } from '@/api'
import Message from '@/components/messages/message'
import Paginate from '@/components/paginate'
import { IMessage } from '@/types'
import { messageStore } from '@/store'

type Props = {
    title: string
    planetId: string
}

export default function MessageList({ title, planetId }: Props) {
    // TODO: query 정보 내부에서 state로 관리
    const searchParams = useSearchParams()
    const [page, setPage] = useState<number>(1)
    const query = {
        page: page,
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }

    const auth = useAuthorization()
    const { data } = useSuspenseQuery({
        queryKey: ['messageList', planetId, query, auth],
        queryFn: () => getMessages(planetId, query, auth),
        refetchOnWindowFocus: false,
    })

    const { setMessage } = messageStore()
    const messageClick = (message: IMessage) => {
        setMessage(message)
    }
    return (
        <div className="flex flex-col w-full mt-2 space-y-2">
            <div className="pb-3">
                {data.messages &&
                    data.messages.map(message => (
                        <Link
                            href={`/messages/detail?planetId=${planetId}&messageId=${message._id}&title=${title}`}
                            key={message._id}
                            onClick={() => messageClick(message)}
                        >
                            <Message key={message._id} message={message} planetId={planetId} title={title} />
                        </Link>
                    ))}
            </div>
            {page && <Paginate page={data.page} setPage={setPage} />}
        </div>
    )
}
