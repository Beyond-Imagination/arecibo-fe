import { SERVER_URL } from '@/config'
import {
    IAuthorization,
    IPostCommentRequest,
    IPostCommentLikeRequest,
    IPostCommentLikeResponse,
    IGetCommentListResponse,
    IDeleteCommentRequest,
    IPutCommentRequest,
} from '@/types'

export async function getComments(planetId: string, messageId: string, query: object, auth: IAuthorization): Promise<IGetCommentListResponse> {
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/planets/${planetId}/messages/${messageId}/comments?${searchParams}`, {
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
export async function postComment(request: IPostCommentRequest): Promise<void> {
    let uri = `${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}/comments`
    if (request.uri.parentCommentId) {
        uri += `/${request.uri.parentCommentId}`
    }
    const res = await fetch(uri, {
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

export async function postCommentLike(request: IPostCommentLikeRequest): Promise<IPostCommentLikeResponse> {
    const res = await fetch(
        `${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}/comments/${request.uri.commentId}/likes`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${request.secret.token}`,
                'Content-Type': 'application/json',
            },
        },
    )
    if (!res.ok) {
        throw new Error('network response was not ok')
    }

    return res.json()
}

export async function deleteComment(request: IDeleteCommentRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}/comments/${request.uri.commentId}`, {
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

export async function modifyComment(request: IPutCommentRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/planets/${request.uri.planetId}/messages/${request.uri.messageId}/comments/${request.uri.commentId}`, {
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
