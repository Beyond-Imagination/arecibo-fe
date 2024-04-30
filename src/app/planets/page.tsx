'use client'

import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getMessages } from '@/api'
import MessageList from '@/components/messages/messageList'
import { useAuthorization } from '@/providers'
import { planetStore } from '@/store'

export default function Page() {
    const searchParams = useSearchParams()
    const { planet } = planetStore()

    if (planet._id === '' || planet.title === '') {
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
        queryKey: ['messageList', planet._id, query, auth],
        queryFn: () => getMessages(planet._id, query, auth),
        refetchOnWindowFocus: false,
    })

    // TODO: add sort button
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <div className="flex flex-row justify-between w-full">
                <p className="text-4xl">{planet.title}</p>
                <Link
                    href={`/messages/create?planetId=${planet._id}&title=${planet.title}`}
                    className="rounded-md px-4 text-xs font-medium my-1 text-white bg-blue-700"
                >
                    <div className="my-2">Create a Post</div>
                </Link>
            </div>
            <MessageList key={planet._id} data={messageList} planetId={planet._id} title={planet.title} />
        </div>
    )
}
