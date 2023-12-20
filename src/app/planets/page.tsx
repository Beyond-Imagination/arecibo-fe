'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()

    const planetId = searchParams.get('planetId')

    return <div>planets : {planetId}</div>
}
