'use client'

import React, { useState } from 'react'
import { WrittenData } from '@/components/aliens/writtenData'

export default function Page() {
    const tabContents = ['Messages', 'Comments']
    const [tabState, setTabState] = useState<number>(0)
    const onClick = (index: number) => {
        setTabState(index)
    }

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12 py-6">
            <div className="flex flex-row gap-2 text-2xl text-center border-b -mb-px">
                {tabContents &&
                    tabContents.map((content, index) => (
                        <button
                            key={`tabContent-${content}`}
                            className={`inline-block border-b-2 p-2 ${
                                index === tabState
                                    ? 'border-black dark:text-white dark:border-white'
                                    : 'text-gray-500 border-transparent hover:border-gray-500 dark:text-gray-500 dark:hover:border-gray-500'
                            }`}
                            onClick={() => onClick(index)}
                        >
                            {content}
                        </button>
                    ))}
            </div>
            <WrittenData dataState={tabState} />
        </div>
    )
}
