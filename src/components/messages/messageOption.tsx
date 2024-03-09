import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { useAuthorization } from '@/providers'
import { deleteMessage } from '@/api'
import { IDeleteMessageRequest, IMessage } from '@/types'
import Dropdown from '@/components/dropdown'

interface Props {
    planetId: string
    title: string
    message: IMessage
}

export default function MessageOption({ planetId, title, message }: Props) {
    const auth = useAuthorization()
    const queryClient = useQueryClient()
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: IDeleteMessageRequest) => {
            return deleteMessage(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['messageList', planetId])
            router.push(`/planets?planetId=${planetId}&title=${title}`)
        },
    })

    const modifyURL = {
        pathname: '/messages/modify',
        query: {
            planetId: planetId,
            messageId: message._id,
            title: title,
            messageTitle: message.title,
            messageContent: message.content,
        },
    }
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

    return (
        <Dropdown>
            {/*TODO: make Link to message modify page*/}
            {message.isAuthor && (
                <Link className="flex p-2" href={modifyURL}>
                    modify
                </Link>
            )}
            {message.isAuthor && (
                <button className="p-2" onClick={deleteToggle}>
                    delete
                </button>
            )}
            {/*TODO: add report */}
            {!message.isAuthor && <button className="p-2">No Action</button>}
        </Dropdown>
    )
}
