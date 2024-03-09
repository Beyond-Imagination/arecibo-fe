import { useQuery } from 'react-query'
import { getAlienDetail } from '@/api'
import { useAuthorization } from '@/providers'
import { IAlien } from '@/types'

export function useAlien(): IAlien {
    const authorization = useAuthorization()
    const { data: alien } = useQuery(['alienDetail', authorization], getAlienDetail, {
        enabled: !!authorization,
        refetchOnWindowFocus: false,
        suspense: true,
    })

    return alien!
}
