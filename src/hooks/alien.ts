import { useQuery } from 'react-query'
import { getAlienDetail } from '@/api'
import { useAuthorization } from '@/providers'
import { IAlien } from '@/types'

export function useAlien(): IAlien {
    const authorization = useAuthorization()
    const { data: alien } = useQuery(['alienDetail', authorization], getAlienDetail, {
        enabled: !!authorization,
        suspense: true,
        cacheTime: 1000 * 60 * 60, // 1 hour
        staleTime: 1000 * 60 * 60, // 1 hour
    })
    return alien!
}
