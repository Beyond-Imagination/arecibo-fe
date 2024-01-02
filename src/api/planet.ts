import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { IAlien, IGetPlanetsResponse } from '@/types'

export async function getPlanets({ queryKey }: QueryFunctionContext<[string, IAlien]>): Promise<IGetPlanetsResponse> {
    const [, alien] = queryKey
    const res = await fetch(`${SERVER_URL}/v1/planets`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${alien.jwt}`,
        },
    })

    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
