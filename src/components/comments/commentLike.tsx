import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

import { Like, UnLike } from '@/icon'
import { useAuthorization } from '@/providers'
import { IPostCommentLikeRequest } from '@/types'
import { postCommentLike } from '@/api/comment'

interface Props {
    id: {
        planetId: string
        messageId: string
        commentId: string
    }
    count: number
    isLiked: boolean
}

export default function CommentLikeButton({ id, count, isLiked }: Props) {
    const auth = useAuthorization()
    const queryClient = useQueryClient()

    const [isLikedState, setIsLikedState] = useState(isLiked)
    const [countState, setCountState] = useState(count)

    const updateState = () => {
        setCountState(prevCount => (isLikedState ? prevCount - 1 : prevCount + 1))
        setIsLikedState(prevIsLiked => !prevIsLiked)
    }

    const mutation = useMutation({
        mutationFn: (request: IPostCommentLikeRequest) => {
            return postCommentLike(request)
        },
        onMutate: () => {
            updateState()
        },
        onSuccess: async data => {
            if (data.message) {
                updateState()
                throw new Error(data.message)
            }
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['message', id.planetId, id.messageId] }),
                queryClient.invalidateQueries({ queryKey: ['commentListWritten', auth] }),
            ])
        },
    })

    const onClick = () => {
        const request: IPostCommentLikeRequest = {
            uri: {
                planetId: id.planetId,
                messageId: id.messageId,
                commentId: id.commentId,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-row">
            <button
                type="button"
                className={`flex-1 rounded-xl w-7 p-1 my-2 hover:bg-neutral-300 hover:dark:bg-[#ffffff26]`}
                onClick={onClick}
                disabled={mutation.isPending}
            >
                {isLikedState ? <UnLike /> : <Like />}
            </button>
            <p className="flex-none my-2 py-1 ms-2">{countState}</p>
        </div>
    )
}
