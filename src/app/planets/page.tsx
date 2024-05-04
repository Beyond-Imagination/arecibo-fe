'use client'

import Link from 'next/link'

import MessageList from '@/components/messages/messageList'
import { planetStore } from '@/store'

export default function Page() {
    const { planet } = planetStore()

    if (planet._id === '' || planet.title === '') {
        throw new Error('400 Bad Request')
    }

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
            <MessageList key={planet._id} planetId={planet._id} title={planet.title} />
        </div>
    )
}
