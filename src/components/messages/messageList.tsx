import Message from '@/components/messages/message'
import { IGetMessageListResponse } from '@/types'
import Paginate from '@/components/paginate'

type Props = {
    data: IGetMessageListResponse
}

export default function MessageList({ data }: Props) {
    const { messages, page } = data
    return (
        <div className="flex flex-col w-full mt-2 space-y-2">
            <div className="pb-3">{messages && messages.map(message => <Message key={message._id} message={message} />)}</div>
            {page && <Paginate page={page} />}
        </div>
    )
}
