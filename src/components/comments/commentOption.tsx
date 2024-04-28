import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthorization } from '@/providers'
import { IDeleteCommentRequest } from '@/types'
import { deleteComment } from '@/api'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/icon'

interface Props {
    planetId: string
    messageId: string
    commentId: string
    isAuthor: boolean
    modifyState: Dispatch<SetStateAction<boolean>>
}

export default function CommentOption({ planetId, messageId, commentId, isAuthor, modifyState }: Props) {
    const auth = useAuthorization()
    const queryClient = useQueryClient()
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: IDeleteCommentRequest) => {
            return deleteComment(request)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['commentList', planetId] }),
                queryClient.invalidateQueries({ queryKey: ['commentListWritten', auth] }),
                queryClient.invalidateQueries({ queryKey: ['message', planetId, messageId] }),
                queryClient.invalidateQueries({ queryKey: ['messageListWritten', auth] }),
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
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }

    const modifyToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        modifyState(true)
    }

    return (
        <Dropdown Icon={OptionIcon} xTranslate={'-translate-x-0'}>
            {isAuthor && (
                <button className="p-2" onClick={modifyToggle}>
                    modify
                </button>
            )}
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
