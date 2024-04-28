import React, { JSX, useState } from 'react'

interface Props {
    children: React.ReactNode
    Icon: () => JSX.Element
    xTranslate: string
}
export default function Dropdown({ children, Icon, xTranslate }: Props) {
    const [open, setOpen] = useState(false)

    const validChildren = React.Children.toArray(children).filter(child => child)
    const dropShowToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        setOpen(!open)
    }
    return (
        <div className="inline-block" onClick={dropShowToggle}>
            <div className="text-black items-center w-6 h-6 dark:text-white">
                <Icon />
            </div>
            {open && (
                <article className={`absolute border rounded-md z-30 translate-y-2 ${xTranslate} shadow-md bg-white dark:bg-[#18191b]`}>
                    <ul className="text-sm">
                        {validChildren.length === 1 ? (
                            <li className="rounded-md hover:bg-gray-100 dark:hover:bg-[#ffffff26]">{validChildren[0]}</li>
                        ) : (
                            validChildren.map((child, index) => {
                                let border = ''
                                if (index === 0) {
                                    border = 'rounded-t-md'
                                } else if (index === validChildren.length - 1) {
                                    border = 'rounded-b-md'
                                }
                                return (
                                    <li key={`option-${index}`} className={`${border} hover:bg-gray-100 dark:hover:bg-[#ffffff26]`}>
                                        {child}
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </article>
            )}
        </div>
    )
}
