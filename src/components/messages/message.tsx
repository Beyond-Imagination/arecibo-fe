import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import { IMessage } from '@/types'
import { Like, Comment } from '@/icon'

interface PlanetProps {
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

export default function Message({ message }: PlanetProps) {
    const timeDifference = dayjs(message.createdAt.toString()).fromNow()

    // TODO: change alien image
    // TODO: add action of buttons
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
                <div className="text-l font-medium text-[#727272] dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: message.content }}></div>
            </div>
            <div className="flex flex-row justify-start pt-3">
                <div className="pe-4">
                    <button
                        type="button"
                        className="flex items-center rounded-full border-2 border-[#EFEFEF] px-3 text-xs font-medium text-[#727272] bg-[#EFEFEF] dark:border-[#727272] dark:text-[#EFEFEF] dark:bg-[#727272]"
                    >
                        <div className="flex-1 w-5 m-2">
                            <Like />
                        </div>
                        <p className="flex-none m-2">{message.likeCount}</p>
                    </button>
                </div>
                <div className="pe-4">
                    <button
                        type="button"
                        className="flex items-center rounded-full border-2 border-[#EFEFEF] px-3 text-xs font-medium text-[#727272] bg-[#EFEFEF] dark:border-[#727272] dark:text-[#EFEFEF] dark:bg-[#727272]"
                    >
                        <div className="flex-1 w-5 m-2">
                            <Comment />
                        </div>
                        <p className="flex-none m-2">{message.commentCount}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
