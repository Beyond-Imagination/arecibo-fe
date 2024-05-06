'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { getMessage } from '@/api'
import { useAuthorization } from '@/providers'
import Message from '@/components/messages/message'
import CommentAdd from '@/components/comments/commentAdd'
import CommentList from '@/components/comments/commentList'
import { planetStore, messageStore } from '@/store'

export default function Page() {
    const { planet } = planetStore()
    const { message } = messageStore()

    if (!planet._id || !planet.title || !message._id) {
        throw new Error('400 Bad Request')
    }

    const auth = useAuthorization()
    const { data: messageData } = useSuspenseQuery({
        queryKey: ['message', planet._id, message._id, auth],
        queryFn: () => getMessage(planet._id, message._id, auth),
        refetchOnWindowFocus: false,
    })
    const commentAddData = {
        planetId: planet._id,
        messageId: message._id,
        parentCommentId: '',
    }
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <div className="flex flex-row justify-between w-full my-2">
                <p className="text-4xl">{planet.title}</p>
            </div>
            <Message key={planet._id} planetId={planet._id} message={messageData} title={planet.title} />
            <div className="border-2 rounded-lg p-2 my-2">
                <CommentAdd data={commentAddData} isShow={() => {}} />
                <CommentList planetId={planet._id} messageId={message._id} />
            </div>
        </div>
    )
}
