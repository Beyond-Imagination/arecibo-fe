export interface IComment {
    _id: string
    messageId: string
    planetId: string
    text: string
    author: {
        organization: string
        nickname: string
    }
    likeCount: string
    comments: IComment[]
    parentCommentId: string
    isLiked: boolean
    isNested: string
    isBlind: string
    createdAt: Date
    updatedAt: Date
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
