import { useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import { ICommentWritten } from '@/types/comment'
import CommentLikeButton from './commentLike'
import CommentOption from './commentOption'
import CommentModify from '@/components/comments/commentModify'

interface Props {
    comment: ICommentWritten
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        ...dayjs.Ls['en'].relativeTime,
        ss: 'a few seconds',
    },
})

export default function CommentWritten({ comment }: Props) {
    const [modifyComment, setModifyComment] = useState(false)
    const timeDifference = dayjs(comment.createdAt.toString()).fromNow()
    // TODO: depth 1 이상인 comment 처리 방법 변경
    const commentLikeData = {
        planetId: comment.planetId._id,
        messageId: comment.messageId._id,
        commentId: comment._id,
    }
    return (
        <div id={comment._id} className="block px-2 my-3">
            <div className="flex flex-row justify-between">
                <Link
                    className="flex flex-row items-center justify-start"
                    href={`/messages/detail?planetId=${comment.planetId._id}&messageId=${comment.messageId._id}&title=${comment.planetId.title}`}
                >
                    <h5 className="text-xl font-medium leading-tight">{comment.planetId.title + "'s Message"}</h5>
                    <div className="text-sm font-medium leading-tight px-2 pt-1 text-[#818284]">{timeDifference}</div>
                </Link>
                <CommentOption
                    planetId={comment.planetId._id}
                    messageId={comment.messageId._id}
                    commentId={comment._id}
                    isAuthor={true}
                    modifyState={setModifyComment}
                />
            </div>
            <div className="mt-2 px-1 border-l-2">
                {modifyComment ? (
                    <CommentModify
                        planetId={comment.planetId._id}
                        messageId={comment.messageId._id}
                        commentId={comment._id}
                        text={comment.text}
                        modifyState={setModifyComment}
                    />
                ) : (
                    <div className="px-2">
                        <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                        </div>
                        <div className="flex flex-row items-center justify-start text-sm">
                            <CommentLikeButton key={comment._id} id={commentLikeData} isLiked={comment.isLiked} count={comment.likeCount} />
                            <div className="rounded-3xl text-xs m-2 px-2">replies {comment.commentsCount}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
