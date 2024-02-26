import React, { useState } from 'react'
import { OptionIcon } from '@/icon'

interface Props {
    children: React.ReactNode
}
export default function Dropdown({ children }: Props) {
    const [open, setOpen] = useState(false)
    const dropShowToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        setOpen(!open)
    }
    return (
        <div className="inline-block" onClick={dropShowToggle}>
            <div className="items-center w-6 h-6">
                <OptionIcon />
            </div>
            {open && (
                <article className="absolute border rounded-md z-30 translate-y-1 dark:bg-[#18191b]">
                    <ul className="text-sm p-1">
                        {children &&
                            React.Children.map(children, child => (
                                <li className="rounded-md hover:bg-gray-200 dark:hover:bg-[#ffffff26]">{child}</li>
                            ))}
                    </ul>
                </article>
            )}
        </div>
    )
}
