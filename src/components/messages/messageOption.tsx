import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthorization } from '@/providers'
import { deleteMessage } from '@/api'
import { IDeleteMessageRequest, IMessage, IMessageWritten } from '@/types'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/icon'
import { messageStore } from '@/store'

interface Props {
    planetId: string
    title: string
    message: IMessage | IMessageWritten
}

export default function MessageOption({ planetId, title, message }: Props) {
    const isAuthor = 'isAuthor' in message ? message.isAuthor : true
    const auth = useAuthorization()
    const queryClient = useQueryClient()
    const router = useRouter()
    const { setMessage } = messageStore()
    const mutation = useMutation({
        mutationFn: (request: IDeleteMessageRequest) => {
            return deleteMessage(request)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['messageList', planetId] }),
                queryClient.invalidateQueries({ queryKey: ['messageListWritten', auth] }),
                queryClient.invalidateQueries({ queryKey: ['commentList', planetId] }),
                queryClient.invalidateQueries({ queryKey: ['commentListWritten', auth] }),
            ])
            router.push(`/planets?planetId=${planetId}&title=${title}`)
        },
    })
    const deleteToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const request: IDeleteMessageRequest = {
            uri: {
                planetId: planetId,
                messageId: message._id,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }
    const modifyClick = () => {
        setMessage(message)
    }

    return (
        <Dropdown Icon={OptionIcon} xTranslate={'-translate-x-0'}>
            {/*TODO: make Link to message modify page*/}
            {isAuthor && (
                <Link
                    className="flex p-2"
                    href={'/messages/modify?planetId=${planetId}&messageId=${message._id}&title=${title}'}
                    onClick={modifyClick}
                >
                    modify
                </Link>
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
