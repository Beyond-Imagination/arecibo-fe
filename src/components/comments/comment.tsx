import { IComment } from '@/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import Image from 'next/image'

interface Props {
    comment: IComment
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        ...dayjs.Ls['en'].relativeTime,
        ss: 'a few seconds',
    },
})

export default function Comment({ comment }: Props) {
    const timeDifference = dayjs(comment.createdAt.toString()).fromNow()

    return (
        <div id={comment._id} className="block px-6 my-3">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-start align-center">
                    <Image src="/images/alien.png" width={8} height={8} alt="Alien Image" className="w-8 h-8 rounded-full me-2" />
                    <h5 className="text-lg font-medium leading-tight text-[#636363] dark:text-neutral-50">{comment.author.nickname}</h5>
                    <div className="text-sm font-medium leading-tight px-2 text-[#636363] dark:text-neutral-50">{timeDifference}</div>
                </div>
            </div>
            <div className="pt-1 border-l-2">
                <div className="ql-snow text-[#636363]">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                </div>
                <div className="flex flex-row justify-start px-2 text-sm text-[#636363] dark:text-neutral-50">
                    {/*TODO: make like button */}
                    <div className="px-2">likes {comment.likeCount} </div>
                    {/*TODO: make reply button */}
                    <div>replies {comment.comments.length}</div>
                </div>
                {comment.comments && comment.comments.map(nestedComment => <Comment key={nestedComment._id} comment={nestedComment} />)}
            </div>
        </div>
    )
}
