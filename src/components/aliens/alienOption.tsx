import React from 'react'
import Link from 'next/link'

import Dropdown from '@/components/dropdown'
import { CaretDown } from '@/icon'

export default function AlienOption() {
    return (
        <div className="pt-2">
            <Dropdown Icon={CaretDown} xTranslate={'-translate-x-28'}>
                <Link href={'/aliens/detail'} className="flex w-32 p-2">
                    My Profile
                </Link>
                <Link href={'/aliens/written'} className="flex w-32 p-2">
                    Written by me
                </Link>
            </Dropdown>
        </div>
    )
}
