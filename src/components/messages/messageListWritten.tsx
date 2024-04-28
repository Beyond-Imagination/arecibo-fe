import Link from 'next/link'

import { IMessageWritten } from '@/types'
import MessageWritten from '@/components/messages/messageWritten'

interface Props {
    messages: IMessageWritten[]
}

export default function MessageListWritten({ messages }: Props) {
    return (
        <div>
            {messages &&
                messages.map(message => (
                    <Link
                        href={`/messages/detail?planetId=${message.planetId._id}&messageId=${message._id}&title=${message.planetId.title}`}
                        key={message._id}
                    >
                        <MessageWritten key={message._id} message={message} />
                    </Link>
                ))}
        </div>
    )
}
