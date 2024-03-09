import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { IAuthorization, IGetPlanetsResponse } from '@/types'

export async function getPlanets({ queryKey }: QueryFunctionContext<[string, IAuthorization]>): Promise<IGetPlanetsResponse> {
    const [, auth] = queryKey
    const res = await fetch(`${SERVER_URL}/v1/planets`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.jwt}`,
        },
    })

    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
