import Message from '@/components/messages/message'
import { IGetMessageListResponse } from '@/types'
import Paginate from '@/components/paginate'

type Props = {
    data: IGetMessageListResponse
}

export default function MessageList({ data }: Props) {
    const { messages, page } = data
    return (
        <div className="flex flex-col space-y-2 w-full mt-2">
            <div className="pb-3">{messages && messages.map(message => <Message key={message._id} message={message} />)}</div>
            <Paginate page={page} />
        </div>
    )
}
