'use client'

import { useAlien } from '@/providers'
import Link from 'next/link'

// TODO: get alien information
export default function Page() {
    const { alien } = useAlien()

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <h4 className="text-3xl z-30 pb-2 border-b-2">My Profile</h4>
            <div className="py-2">
                <div className="flex flex-col profile my-4">
                    <label className="mb-1 font-semibold" htmlFor="nickname">
                        Nickname
                    </label>
                    <div id="nickname" className="content-item">
                        {alien.nickname}
                    </div>
                </div>
                <Link href={'/aliens/modify'} className="rounded-lg font-medium text-sm px-3 py-3 my-3 me-2 text-white bg-blue-700">
                    Modify
                </Link>
            </div>
        </div>
    )
}
