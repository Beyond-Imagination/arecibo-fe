'use client'

import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getMessages } from '@/api'
import MessageList from '@/components/messages/messageList'
import { useAuthorization } from '@/providers'

export default function Page() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId') || ''
    const title = searchParams.get('title') || ''

    if (planetId === '' || title === '') {
        throw new Error('400 Bad Request')
    }

    // TODO: query 정보 내부에서 state로 관리
    const query = {
        page: searchParams.get('page') || '1',
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }

    const auth = useAuthorization()
    const { data: messageList } = useSuspenseQuery({
        queryKey: ['messageList', planetId, query, auth],
        queryFn: getMessages,
        refetchOnWindowFocus: false,
    })

    // TODO: add sort button
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <div className="flex flex-row justify-between w-full">
                <p className="text-4xl">{title}</p>
                <Link
                    href={`/messages/create?planetId=${planetId}&title=${title}`}
                    className="rounded-md px-4 text-xs font-medium my-1 text-white bg-blue-700"
                >
                    <div className="my-2">Create a Post</div>
                </Link>
            </div>
            <MessageList key={planetId} data={messageList} planetId={planetId} title={title} />
        </div>
    )
}
