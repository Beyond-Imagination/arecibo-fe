import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'react-quill/dist/quill.snow.css'

import { IMessageWritten } from '@/types'
import { CommentIcon } from '@/icon'
import MessageLikeButton from './messageLike'
import MessageOption from '@/components/messages/messageOption'

interface Props {
    message: IMessageWritten
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        ...dayjs.Ls['en'].relativeTime,
        ss: 'a few seconds',
    },
})

export default function MessageWritten({ message }: Props) {
    const timeDifference = dayjs(message.createdAt.toString()).fromNow()
    return (
        <div id={`message${message._id}`} className="border-2 block p-6 mb-4 rounded-lg ">
            <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-row items-center justify-start align-center">
                    <h5 className="text-2xl font-medium leading-tight">{message.planetId.title}</h5>
                </div>
                <div className="flex flex-row items-center justify-end">
                    <div className="text-1 font-medium leading-tight text-[#818284]">{timeDifference}</div>
                    <MessageOption planetId={message.planetId._id} message={message} title={message.planetId.title} />
                </div>
            </div>
            <div className="pb-1">
                <h5 className="text-xl font-bold leading-tight">{message.title}</h5>
                <div className="ql-snow">
                    <div className="ql-editor ql-view" dangerouslySetInnerHTML={{ __html: message.content }}></div>
                </div>
            </div>
            <div className="flex flex-row justify-start pt-3">
                <div className="pe-4">
                    <MessageLikeButton planetId={message.planetId._id} messageId={message._id} count={message.likeCount} isLiked={message.isLiked} />
                </div>
                <div className="pe-4">
                    <div className="flex items-center rounded-full px-3 text-xs font-medium bg-[#EFEFEF] dark:bg-[#818284]">
                        <div className="flex-1 w-5 m-2">
                            <CommentIcon />
                        </div>
                        <p className="flex-none m-2">{message.commentCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
