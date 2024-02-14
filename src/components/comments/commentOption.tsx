import React from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { useAlien } from '@/providers'
import { IDeleteCommentRequest } from '@/types'
import { deleteComment } from '@/api'
import Dropdown from '@/components/dropdown'

interface Props {
    planetId: string
    messageId: string
    commentId: string
    isAuthor: boolean
}

export default function CommentOption({ planetId, messageId, commentId, isAuthor }: Props) {
    const alien = useAlien()
    const queryClient = useQueryClient()
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: IDeleteCommentRequest) => {
            return deleteComment(request)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries(['commentList', planetId]),
                queryClient.invalidateQueries(['message', planetId, messageId]),
            ])
            router.forward()
        },
    })

    const deleteToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const request: IDeleteCommentRequest = {
            uri: {
                planetId: planetId,
                messageId: messageId,
                commentId: commentId,
            },
            secret: {
                token: alien.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <Dropdown>
            {/*TODO: make Link to message modify page*/}
            {isAuthor && <button className="p-2">modify</button>}
            {isAuthor && (
                <button className="p-2" onClick={deleteToggle}>
                    delete
                </button>
            )}
            {/*TODO: add report */}
            {!isAuthor && <button className="p-2">No Action</button>}
        </Dropdown>
    )
}
