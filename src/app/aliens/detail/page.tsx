'use client'

import { useAlien } from '@/providers'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import { getAlienDetail } from '@/api'
import { IGetAlienDetailResponse } from '@/types'
import NicknameUpdateStatus from '@/components/aliens/nicknameUpdateStatus'

export default function Page() {
    const { alien } = useAlien()
    const data =
        useQuery(['aliens', alien], getAlienDetail, {
            enabled: !!alien,
            refetchOnWindowFocus: false,
            suspense: true,
        })?.data || ({} as IGetAlienDetailResponse)
    const updateTime = useMemo(() => {
        return dayjs(data.lastNicknameUpdateTime).add(1, 'h').toDate()
    }, [])
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
                        {data.nickname}
                    </div>
                    <NicknameUpdateStatus
                        updateTime={updateTime}
                        isUpdateAllow={{ state: isNicknameUpdateAllow, setter: setIsNicknameUpdateAllow }}
                    />
                </div>
                <Link
                    href={'/aliens/modify'}
                    className="rounded-lg font-medium text-sm px-3 py-3 my-3 me-2 text-white bg-blue-700"
                    onClick={linkHandler}
                >
                    Modify
                </Link>
            </div>
        </div>
    )
}
