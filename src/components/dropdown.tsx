import React, { useState } from 'react'
import { OptionIcon } from '@/icon'

interface Props {
    children: React.ReactNode
}
export default function Dropdown({ children }: Props) {
    const [open, setOpen] = useState(false)
    const dropShowToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setOpen(!open)
    }
    return (
        <div className="inline-block">
            <button className="px-2 text-[#636363] bg:text-white items-center" onClick={dropShowToggle}>
                <OptionIcon />
            </button>
            <article className="absolute rounded-lg shadow-xl shadow-gray-300 z-30 -translate-x-2 transition-opacity duration-300 bg-white dark:shadow-[#242424] dark:bg-neutral-500">
                {open && (
                    <ul className="text-sm text-[#636363] dark:text-white">
                        {children &&
                            React.Children.map(children, child => <li className="rounded-md hover:bg-gray-200 dark:hover:bg-[#363636]">{child}</li>)}
                    </ul>
                )}
            </article>
        </div>
    )
}
