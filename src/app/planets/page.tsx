'use client'

import { useQuery } from 'react-query'
import { useSearchParams } from 'next/navigation'

import { getMessages } from '@/api'
import { IGetMessageListResponse } from '@/types'
import MessageList from '@/components/messages/messageList'
import { useAlien } from '@/providers'

export default function Page() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId') || ''
    const title = searchParams.get('title')
    // TODO: query 정보 내부에서 state로 관리
    const query = {
        page: searchParams.get('page') || '1',
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }

    const alien = useAlien()
    const data =
        useQuery(['messageList', planetId, query, alien], getMessages, {
            enabled: !!alien && !!planetId,
            refetchOnWindowFocus: false,
            suspense: true,
        })?.data || ({} as IGetMessageListResponse)

    // TODO: add sort button
    // TODO: add button Action
    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <div className="flex flex-row justify-between w-full">
                <p className="text-4xl">{title}</p>
                <button
                    type="button"
                    className="inline-block rounded-full border-2 border-[#EFF8F5] px-6 text-xs font-medium leading-normal text-[#3E3E3E] bg-[#EFF8F5]"
                >
                    Create a post
                </button>
            </div>
            <MessageList key={planetId} data={data} />
        </div>
    )
}
