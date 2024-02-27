import React from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { useAlien } from '@/providers'
import { deleteMessage } from '@/api'
import { IDeleteMessageRequest } from '@/types'
import Dropdown from '@/components/dropdown'

interface Props {
    planetId: string
    messageId: string
    isAuthor: boolean
    title: string
}

export default function MessageOption({ planetId, messageId, isAuthor, title }: Props) {
    const { alien } = useAlien()
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
    const deleteToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const request: IDeleteMessageRequest = {
            uri: {
                planetId: planetId,
                messageId: messageId,
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
