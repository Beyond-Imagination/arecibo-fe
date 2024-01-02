import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import { IAlien, IGetMessageListResponse, IPostMessageRequest } from '@/types'

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

export async function postMesage(request: IPostMessageRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/message`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}
