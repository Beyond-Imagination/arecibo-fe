import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'react-quill/dist/quill.snow.css'

import { IMessage } from '@/types'
import { CommentIcon } from '@/icon'
import MessageLikeButton from './messageLike'
import MessageOption from './messageOption'

interface Props {
    planetId: string
    title: string
    message: IMessage
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        ...dayjs.Ls['en'].relativeTime,
        ss: 'a few seconds',
    },
})

export default function Message({ planetId, title, message }: Props) {
    const timeDifference = dayjs(message.createdAt.toString()).fromNow()

    // TODO: change alien image
    return (
        <div id={`message${message._id}`} className="border-2 block p-6 mb-4 rounded-lg ">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-start align-center">
                    <Image src="/images/alien.png" width={8} height={8} alt="Alien Image" className="w-8 h-8 rounded-full me-2" />
                    <h5 className="text-3xl font-medium leading-tight">{message.author.nickname}</h5>
                </div>
                <div className="flex flex-row align-center justify-end">
                    <div className="text-1 font-medium leading-tight text-[#818284]">{timeDifference}</div>
                    <MessageOption planetId={planetId} messageId={message._id} isAuthor={message.isAuthor} title={title} />
                </div>
            </div>
            <div className="pb-1">
                <h5 className="text-2xl font-bold leading-tight">{message.title}</h5>
                <div className="ql-snow">
                    <div className="ql-editor ql-view" dangerouslySetInnerHTML={{ __html: message.content }}></div>
                </div>
            </div>
            <div className="flex flex-row justify-start pt-3">
                <div className="pe-4">
                    <MessageLikeButton planetId={planetId} messageId={message._id} count={message.likeCount} isLiked={message.isLiked} />
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
