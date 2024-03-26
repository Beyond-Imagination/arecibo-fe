import { useSuspenseQuery } from '@tanstack/react-query'
import { getAlienDetail } from '@/api'
import { useAuthorization } from '@/providers'
import { IAlien } from '@/types'

export function useAlien(): IAlien {
    const authorization = useAuthorization()
    const { data: alien } = useSuspenseQuery({
        queryKey: ['alienDetail', authorization],
        queryFn: () => getAlienDetail(authorization),
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60, // 1 hour
    })
    return alien!
}
