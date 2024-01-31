import Message from '@/components/messages/message'
import { IGetMessageListResponse } from '@/types'
import Paginate from '@/components/paginate'
import Link from 'next/link'

type Props = {
    data: IGetMessageListResponse
    title: string
    planetId: string
}

export default function MessageList({ data, title, planetId }: Props) {
    const { messages, page } = data
    return (
        <div className="flex flex-col w-full mt-2 space-y-2">
            <div className="pb-3">
                {messages &&
                    messages.map(message => (
                        <Link href={`/messages/detail?planetId=${planetId}&messageId=${message._id}&title=${title}`} key={message._id}>
                            <Message key={message._id} message={message} />
                        </Link>
                    ))}
            </div>
            {page && <Paginate page={page} />}
        </div>
    )
}
