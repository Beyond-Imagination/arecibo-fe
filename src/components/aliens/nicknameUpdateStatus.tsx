import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

interface Props {
    isUpdateAllow: {
        state: boolean
        setter: React.Dispatch<React.SetStateAction<boolean>>
    }
    updateTime: Date
}

export default function NicknameUpdateStatus({ isUpdateAllow, updateTime }: Props) {
    const [leftTime, setLeftTime] = useState<number>(updateTime.getTime() - Date.now())
    useInterval(
        () => {
            setLeftTime(leftTime - 1000)
            if (leftTime <= 0) {
                isUpdateAllow.setter(true)
            }
        },
        isUpdateAllow.state ? null : 1000,
    )
    return (
        <div className="note">
            {isUpdateAllow.state
                ? 'You can change your nickname right now!'
                : `Time until you can change your nickname: 0:${dayjs(leftTime).format('mm:ss')}`}
        </div>
    )
}
