import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { IAlien, IGetMessageListResponse } from '@/types'

export async function getMessages({ queryKey }: QueryFunctionContext<[string, string, object, IAlien]>): Promise<IGetMessageListResponse> {
    const [, planetId, query, alien] = queryKey
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/planets/${planetId}/messages?${searchParams}`, {
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
