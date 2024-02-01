import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'react-quill/dist/quill.snow.css'

import { IMessage } from '@/types'
import { CommentIcon } from '@/icon'
import MessageLikeButton from './messageLike'

interface Props {
    planetId: string
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

export default function Message({ planetId, message }: Props) {
    const timeDifference = dayjs(message.createdAt.toString()).fromNow()

    // TODO: change alien image
    return (
        <div id={`message${message._id}`} className="block p-6 my-3 bg-white rounded-lg dark:bg-neutral-700">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-start align-center">
                    <Image src="/images/alien.png" width={8} height={8} alt="Alien Image" className="w-8 h-8 rounded-full me-2" />
                    <h5 className="text-3xl font-medium leading-tight text-[#636363] dark:text-neutral-50">{message.author.nickname}</h5>
                </div>
                <div className="text-1 font-medium leading-tight text-[#636363] dark:text-neutral-50">{timeDifference}</div>
            </div>
            <div className="pt-1">
                <h5 className="text-2xl font-medium leading-tight text-[#727272] dark:text-neutral-300">{message.title}</h5>
                <div className="ql-snow rounded-md border-2 mt-2 border-[#EFEFEF]">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: message.content }}></div>
                </div>
            </div>
            <div className="flex flex-row justify-start pt-3">
                <div className="pe-4">
                    <MessageLikeButton planetId={planetId} messageId={message._id} count={message.likeCount} isLiked={message.isLiked} />
                </div>
                <div className="pe-4">
                    <button
                        type="button"
                        className="flex items-center rounded-full border-2 px-3 text-xs font-medium text-[#727272] border-[#EFEFEF] bg-[#EFEFEF] dark:text-[#EFEFEF] dark:border-[#727272] dark:bg-[#727272]"
                    >
                        <div className="flex-1 w-5 m-2">
                            <CommentIcon />
                        </div>
                        <p className="flex-none m-2">{message.commentCount}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
