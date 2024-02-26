'use client'

import { useQuery } from 'react-query'
import { useSearchParams } from 'next/navigation'

import { getMessage } from '@/api'
import { IGetMessageResponse } from '@/types'
import { useAlien } from '@/providers'
import Message from '@/components/messages/message'
import CommentAdd from '@/components/comments/commentAdd'
import CommentList from '@/components/comments/commentList'

export default function Page() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId')
    const messageId = searchParams.get('messageId')
    const title = searchParams.get('title')

    if (!planetId || !title || !messageId) {
        throw new Error('400 Bad Request')
    }

    const alien = useAlien()
    const data =
        useQuery(['message', planetId, messageId, alien], getMessage, {
            enabled: !!alien,
            refetchOnWindowFocus: false,
            suspense: true,
        })?.data || ({} as IGetMessageResponse)
    const commentAddData = {
        planetId: planetId,
        messageId: messageId,
        parentCommentId: '',
    }
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <div className="flex flex-row justify-between w-full my-2">
                <p className="text-4xl">{title}</p>
            </div>
            <Message key={planetId} planetId={planetId} message={data} title={title} />
            <div className="border-2 rounded-lg p-2 my-2">
                <CommentAdd data={commentAddData} isShow={() => {}} />
                <CommentList planetId={planetId} messageId={messageId} />
            </div>
        </div>
    )
}
