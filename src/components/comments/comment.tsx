import Image from 'next/image'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import { IComment } from '@/types/comment'
import CommentAdd from './commentAdd'
import CommentLikeButton from './commentLike'
import CommentOption from './commentOption'
import CommentModify from '@/components/comments/commentModify'

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
    const [showCommentAdd, setShowCommentAdd] = useState(false)
    const [modifyComment, setModifyComment] = useState(false)
    const timeDifference = dayjs(comment.createdAt.toString()).fromNow()
    // TODO: depth 1 이상인 comment 처리 방법 변경
    const parentCommentId = comment.isNested ? comment.parentCommentId : comment._id
    const nestedCommentAddData = {
        planetId: comment.planetId,
        messageId: comment.messageId,
        parentCommentId: parentCommentId,
    }
    const commentLikeData = {
        planetId: comment.planetId,
        messageId: comment.messageId,
        commentId: comment._id,
    }
    const toggleCommentAdd = () => {
        setShowCommentAdd(!showCommentAdd)
    }
    return (
        <div id={comment._id} className="block ps-2 mt-3">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-start align-center">
                    <Image src="/images/alien.png" width={8} height={8} alt="Alien Image" className="w-8 h-8 rounded-full me-2" />
                    <h5 className="text-lg font-medium leading-tight">{comment.isDeleted ? '(Deleted)' : comment.author.nickname}</h5>
                    {!comment.isDeleted && <div className="text-sm font-medium leading-tight px-2 text-[#818284]">{timeDifference}</div>}
                </div>
                {!comment.isDeleted && (
                    <CommentOption
                        planetId={comment.planetId}
                        messageId={comment.messageId}
                        commentId={comment._id}
                        isAuthor={comment.isAuthor}
                        modifyState={setModifyComment}
                    />
                )}
            </div>
            <div className="pt-1 border-l-2">
                {modifyComment ? (
                    <CommentModify
                        planetId={comment.planetId}
                        messageId={comment.messageId}
                        commentId={comment._id}
                        text={comment.text}
                        modifyState={setModifyComment}
                    />
                ) : (
                    <div className="px-2">
                        <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                        </div>
                        {!comment.isDeleted && (
                            <div className="flex flex-row justify-start text-sm">
                                <CommentLikeButton key={comment._id} id={commentLikeData} isLiked={comment.isLiked} count={comment.likeCount} />
                                <button
                                    onClick={toggleCommentAdd}
                                    className="rounded-3xl text-xs m-2 px-2 hover:bg-neutral-300 hover:dark:bg-[#ffffff26]"
                                >
                                    replies {comment.comments.length}
                                </button>
                            </div>
                        )}
                        {showCommentAdd && <CommentAdd key={comment._id} data={nestedCommentAddData} isShow={toggleCommentAdd} />}
                    </div>
                )}
                <div className="flex flex-col mt-1 ps-5">
                    {comment.comments && comment.comments.map(nestedComment => <Comment key={nestedComment._id} comment={nestedComment} />)}
                </div>
            </div>
        </div>
    )
}
