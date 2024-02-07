import React from 'react'

interface Props {
    children: React.ReactNode
    visibility: boolean
}
export default function Dropdown({ children, visibility }: Props) {
    return (
        <article className="absolute rounded-lg shadow-xl shadow-gray-300 z-30 -translate-x-2 transition-opacity duration-300 bg-white dark:shadow-[#242424] dark:bg-neutral-500">
            {visibility && children}
        </article>
    )
}
