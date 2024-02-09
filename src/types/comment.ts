export interface IComment {
    _id: string
    messageId: string
    planetId: string
    text: string
    author: {
        organization: string
        nickname: string
    }
    likeCount: number
    comments: IComment[]
    parentCommentId: string
    isLiked: boolean
    isNested: boolean
    isAuthor: boolean
    isBlind: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IGetCommentListResponse {
    comments: IComment[]
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
}

export interface IPostCommentRequest {
    body: {
        text: string
    }
    uri: {
        planetId: string
        messageId: string
        parentCommentId?: string
    }
    secret: {
        token: string
    }
}

export interface IPostCommentLikeRequest {
    uri: {
        planetId: string
        messageId: string
        commentId: string
    }
    secret: {
        token: string
    }
}

export interface IPostCommentLikeResponse {
    message: string
    likeCount: number
}
