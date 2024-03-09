import { useMutation, useQueryClient } from 'react-query'
import React, { useState } from 'react'

import { Like, UnLike } from '@/icon'
import { useAuthorization } from '@/providers'
import { IPostMessageLikeRequest } from '@/types'
import { postMessageLike } from '@/api'

interface Props {
    planetId: string
    messageId: string
    count: number
    isLiked: boolean
}

export default function MessageLikeButton({ planetId, messageId, count, isLiked }: Props) {
    const auth = useAuthorization()
    const queryClient = useQueryClient()

    const [isLikedState, setIsLikedState] = useState(isLiked)
    const [countState, setCountState] = useState(count)

    const updateState = () => {
        setCountState(prevCount => (isLikedState ? prevCount - 1 : prevCount + 1))
        setIsLikedState(prevIsLiked => !prevIsLiked)
    }
    const mutation = useMutation({
        mutationFn: (request: IPostMessageLikeRequest) => {
            return postMessageLike(request)
        },
        onMutate: () => {
            updateState()
        },
        onSuccess: async data => {
            if (data.message) {
                updateState()
                throw new Error(data.message)
            }
            await queryClient.invalidateQueries({ queryKey: ['messageList', planetId] })
        },
    })
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const request: IPostMessageLikeRequest = {
            uri: {
                planetId: planetId,
                messageId: messageId,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }
    return (
        <button
            type="button"
            className={`flex items-center rounded-full px-3 text-xs font-medium ${
                isLikedState ? 'text-white bg-[#fe6d70]' : 'bg-[#EFEFEF] dark:bg-[#818284]'
            }`}
            onClick={onClick}
        >
            <div className="flex-1 w-5 m-2">{isLikedState ? <UnLike /> : <Like />}</div>
            <p className="flex-none m-2">{countState}</p>
        </button>
    )
}
