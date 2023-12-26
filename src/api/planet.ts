import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { ICredential, IGetPlanetsResponse } from '@/types'

export async function getPlanets({ queryKey }: QueryFunctionContext<[string, ICredential]>): Promise<IGetPlanetsResponse> {
    const [, { token }] = queryKey
    // TODO: use beUrl
    const res = await fetch(`${SERVER_URL}/v1/planets`, {
        method: 'GET',
        headers: {
            // TODO: token change
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}