import { QueryFunctionContext } from 'react-query'

import { SERVER_URL } from '@/config'
import {
    IAlien,
    IDeleteMessageRequest,
    IGetMessageListResponse,
    IGetMessageResponse,
    IPostMessageLikeRequest,
    IPostMessageLikeResponse,
    IPostMessageRequest,
} from '@/types'

export async function getMessage({ queryKey }: QueryFunctionContext<[string, string, string, IAlien]>): Promise<IGetMessageResponse> {
    const [, planetId, messageId, alien] = queryKey
    const res = await fetch(`${SERVER_URL}/v1/planets/${planetId}/messages/${messageId}`, {
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

export async function postMessage(request: IPostMessageRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages`, {
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

export async function postMessageLike(request: IPostMessageLikeRequest): Promise<IPostMessageLikeResponse> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}/likes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }

    return res.json()
}

export async function deleteMessage(request: IDeleteMessageRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}
