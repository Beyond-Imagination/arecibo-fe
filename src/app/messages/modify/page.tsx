'use client'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { putMessage } from '@/api'
import { IMessageFormInputs, IPutMessageRequest } from '@/types'
import { useAlien } from '@/providers'
import MessageForm from '@/components/messages/messageForm'

export default function Create() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId') || ''
    const messageId = searchParams.get('messageId') || ''
    const title = searchParams.get('title') || ''
    const initValue: IMessageFormInputs = {
        title: searchParams.get('messageTitle') || '',
        content: searchParams.get('messageContent') || '',
    }

    if (planetId === '' || title === '') {
        throw new Error('400 Bad Request')
    }

    const { alien } = useAlien()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPutMessageRequest) => {
            return putMessage(body)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries(['messageList', planetId]),
                queryClient.invalidateQueries(['message', planetId, messageId]),
            ])
            router.replace(`/messages/detail?planetId=${planetId}&messageId=${messageId}&title=${title}`)
        },
    })
    const onSubmit: SubmitHandler<IMessageFormInputs> = (data: IMessageFormInputs) => {
        const request: IPutMessageRequest = {
            body: {
                title: data.title,
                content: data.content,
            },
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
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <p className="text-4xl">{title}</p>
            <MessageForm onSubmit={onSubmit} initValue={initValue} />
        </div>
    )
}
