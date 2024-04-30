'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { putMessage } from '@/api'
import { IMessageFormInputs, IPutMessageRequest } from '@/types'
import { useAuthorization } from '@/providers'
import MessageForm from '@/components/messages/messageForm'
import { planetStore } from '@/store'

export default function Create() {
    const searchParams = useSearchParams()
    const { planet } = planetStore()
    const messageId = searchParams.get('messageId') || ''
    const initValue: IMessageFormInputs = {
        title: searchParams.get('messageTitle') || '',
        content: searchParams.get('messageContent') || '',
    }

    if (planet._id === '' || planet.title === '') {
        throw new Error('400 Bad Request')
    }

    const auth = useAuthorization()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPutMessageRequest) => {
            return putMessage(body)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['messageList', planet._id] }),
                queryClient.invalidateQueries({ queryKey: ['message', planet._id, messageId] }),
                queryClient.invalidateQueries({ queryKey: ['messageListWritten', auth] }),
            ])
            router.replace(`/messages/detail?planetId=${planet._id}&messageId=${messageId}&title=${planet.title}`)
        },
    })
    const onSubmit: SubmitHandler<IMessageFormInputs> = (data: IMessageFormInputs) => {
        const request: IPutMessageRequest = {
            body: {
                title: data.title,
                content: data.content,
            },
            uri: {
                planetId: planet._id,
                messageId: messageId,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <p className="text-4xl">{planet.title}</p>
            <MessageForm onSubmit={onSubmit} initValue={initValue} />
        </div>
    )
}
