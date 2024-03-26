import { SERVER_URL } from '@/config'
import {
    IAuthorization,
    IDeleteMessageRequest,
    IGetMessageListResponse,
    IGetMessageResponse,
    IPostMessageLikeRequest,
    IPostMessageLikeResponse,
    IPostMessageRequest,
    IPutMessageRequest,
} from '@/types'

export async function getMessage(planetId: string, messageId: string, auth: IAuthorization): Promise<IGetMessageResponse> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${planetId}/messages/${messageId}`, {
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

export async function getMessages(planetId: string, query: object, auth: IAuthorization): Promise<IGetMessageListResponse> {
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/planets/${planetId}/messages?${searchParams}`, {
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

export async function putMessage(request: IPutMessageRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}`, {
        method: 'PUT',
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
