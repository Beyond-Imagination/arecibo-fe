export interface IMessage {
    _id: string
    title: string
    content: string
    author: {
        organization: string
        nickname: string
    }
    commentCount: number
    likeCount: number
    isBlind: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IGetMessageListResponse {
    messages: IMessage[]
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
}

export interface IPostMessageRequest {
    body: {
        title: string
        content: string
    }
    uri: {
        planetId: string
    }
    secret: {
        token: string
    }
}
