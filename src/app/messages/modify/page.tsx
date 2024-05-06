'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { putMessage } from '@/api'
import { IMessageFormInputs, IPutMessageRequest } from '@/types'
import { useAuthorization } from '@/providers'
import MessageForm from '@/components/messages/messageForm'
import { planetStore, messageStore } from '@/store'

export default function Create() {
    const { planet } = planetStore()
    const { message } = messageStore()
    const initValue: IMessageFormInputs = {
        title: message.title,
        content: message.content,
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
                queryClient.invalidateQueries({ queryKey: ['message', planet._id, message._id] }),
                queryClient.invalidateQueries({ queryKey: ['messageListWritten', auth] }),
            ])
            router.replace(`/messages/detail?planetId=${planet._id}&messageId=${message._id}&title=${planet.title}`)
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
                messageId: message._id,
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
