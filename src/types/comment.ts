export interface ICommentBasis {
    _id: string
    text: string
    likeCount: number
    isLiked: boolean
    isNested: boolean
    isBlind: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IComment extends ICommentBasis {
    planetId: string
    messageId: string
    parentCommentId: string
    author: {
        organization: string
        nickname: string
    }
    comments: IComment[]
    isAuthor: boolean
}

export interface ICommentWritten extends ICommentBasis {
    planetId: {
        _id: string
        title: string
    }
    messageId: {
        _id: string
        title: string
    }
    parentCommentId: string
    commentsCount: number
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

export interface IGetWrittenCommentResponse {
    comments: ICommentWritten[]
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

export interface IDeleteCommentRequest {
    uri: {
        planetId: string
        messageId: string
        commentId: string
    }
    secret: {
        token: string
    }
}

export interface IPutCommentRequest {
    body: {
        text: string
    }
    uri: {
        planetId: string
        messageId: string
        commentId: string
    }
    secret: {
        token: string
    }
}
