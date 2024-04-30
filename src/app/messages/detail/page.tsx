'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getMessage } from '@/api'
import { useAuthorization } from '@/providers'
import Message from '@/components/messages/message'
import CommentAdd from '@/components/comments/commentAdd'
import CommentList from '@/components/comments/commentList'
import { planetStore } from '@/store'

export default function Page() {
    const searchParams = useSearchParams()
    const { planet } = planetStore()
    const messageId = searchParams.get('messageId')

    if (!planet._id || !planet.title || !messageId) {
        throw new Error('400 Bad Request')
    }

    const auth = useAuthorization()
    const { data: message } = useSuspenseQuery({
        queryKey: ['message', planet._id, messageId, auth],
        queryFn: () => getMessage(planet._id, messageId, auth),
        refetchOnWindowFocus: false,
    })
    const commentAddData = {
        planetId: planet._id,
        messageId: messageId,
        parentCommentId: '',
    }
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <div className="flex flex-row justify-between w-full my-2">
                <p className="text-4xl">{planet.title}</p>
            </div>
            <Message key={planet._id} planetId={planet._id} message={message} title={planet.title} />
            <div className="border-2 rounded-lg p-2 my-2">
                <CommentAdd data={commentAddData} isShow={() => {}} />
                <CommentList planetId={planet._id} messageId={messageId} />
            </div>
        </div>
    )
}
