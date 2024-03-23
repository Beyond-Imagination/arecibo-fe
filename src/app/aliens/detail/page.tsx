'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

import NicknameUpdateStatus from '@/components/aliens/nicknameUpdateStatus'
import { useAlien } from '@/hooks'

export default function Page() {
    const alien = useAlien()
    const updateTime = useMemo(() => {
        if (alien.lastNicknameUpdateTime) {
            return dayjs(alien.lastNicknameUpdateTime).add(1, 'h').toDate()
        } else {
            return new Date()
        }
    }, [alien])
    const [isNicknameUpdateAllow, setIsNicknameUpdateAllow] = useState(updateTime.getTime() <= Date.now())
    const linkHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!isNicknameUpdateAllow) {
            event.preventDefault()
        }
    }

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
                    <NicknameUpdateStatus
                        updateTime={updateTime}
                        isUpdateAllow={{ state: isNicknameUpdateAllow, setter: setIsNicknameUpdateAllow }}
                    />
                </div>
                <Link
                    href={`/aliens/modify?nickname=${alien.nickname}`}
                    className="rounded-lg font-medium text-sm px-3 py-3 my-3 me-2 text-white bg-blue-700"
                    onClick={linkHandler}
                >
                    Modify
                </Link>
            </div>
        </div>
    )
}
