'use client'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { postMessage } from '@/api'
import { IMessageFormInputs, IPostMessageRequest } from '@/types'
import { useAuthorization } from '@/providers'
import MessageForm from '@/components/messages/messageForm'

export default function Create() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId') || ''
    const title = searchParams.get('title') || ''

    if (planetId === '' || title === '') {
        throw new Error('400 Bad Request')
    }
    const auth = useAuthorization()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPostMessageRequest) => {
            return postMessage(body)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['messageList', planetId])
            router.push(`/planets?planetId=${planetId}&title=${title}`)
        },
    })
    const onSubmit: SubmitHandler<IMessageFormInputs> = (data: IMessageFormInputs) => {
        const request: IPostMessageRequest = {
            body: {
                title: data.title,
                content: data.content,
            },
            uri: {
                planetId: planetId,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <p className="text-4xl">{title}</p>
            <MessageForm onSubmit={onSubmit} />
        </div>
    )
}
