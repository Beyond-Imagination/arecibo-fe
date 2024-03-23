import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ICredential } from '@/types'
import getCredential from '@/services/space/auth'

export function useCredential(): ICredential {
    const [client, setClient] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClient(true)
        }
    }, [typeof window])

    const { data: credential } = useQuery<ICredential>({
        queryKey: ['accessToken'],
        queryFn: getCredential,
        enabled: client,
        staleTime: 1000 * 60 * 9, // 9 minutes
        gcTime: 1000 * 60 * 9, // 9 minutes
    })

    return credential!
}
