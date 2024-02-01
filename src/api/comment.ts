import { SERVER_URL } from '@/config'
import { IPostCommentRequest, IPostCommentLikeRequest, IPostCommentLikeResponse } from '@/types/comment'

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
