import { useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'

import { Like } from '@/icon'
import { useAlien } from '@/providers'
import { IPostMessageLikeRequest } from '@/types'
import { postMessageLike } from '@/api'

interface Props {
    messageId: string
    count: number
    isLiked: boolean
}

export default function MessageLikeButton({ messageId, count, isLiked }: Props) {
    const alien = useAlien()
    const planetId = useSearchParams().get('planetId') || ''
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (requset: IPostMessageLikeRequest) => {
            return postMessageLike(requset)
        },
        onSuccess: async data => {
            if (data.message) {
                throw new Error(data.message)
            }
            await queryClient.invalidateQueries({ queryKey: ['messageList', planetId] })
        },
    })
    const onClick = () => {
        const request: IPostMessageLikeRequest = {
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
        <button
            type="button"
            className={`flex items-center rounded-full border-2 px-3 text-xs font-medium ${
                isLiked
                    ? 'text-[#EFEFEF] border-[#727272] bg-[#727272] dark:text-[#727272] dark:border-[#EFEFEF] dark:bg-[#EFEFEF]'
                    : 'text-[#727272] border-[#EFEFEF] bg-[#EFEFEF] dark:text-[#EFEFEF] dark:border-[#727272] dark:bg-[#727272]'
            }`}
            onClick={onClick}
        >
            <div className="flex-1 w-5 m-2">
                <Like />
            </div>
            <p className="flex-none m-2">{count}</p>
        </button>
    )
}
