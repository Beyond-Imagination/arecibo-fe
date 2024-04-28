export interface IMessageBasis {
    _id: string
    title: string
    content: string
    commentCount: number
    likeCount: number
    isLiked: boolean
    isBlind: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IMessage extends IMessageBasis {
    author: {
        organization: string
        nickname: string
    }
    isAuthor: boolean
}

export interface IMessageWritten extends IMessageBasis {
    planetId: {
        _id: string
        title: string
    }
}

export interface IMessageFormInputs {
    title: string
    content: string
}

export interface IGetMessageResponse extends IMessage {}

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

export interface IGetWrittenMessageResponse {
    messages: IMessageWritten[]
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

export interface IPutMessageRequest extends IPostMessageRequest {
    uri: {
        planetId: string
        messageId: string
    }
}

export interface IPostMessageLikeRequest {
    uri: {
        planetId: string
        messageId: string
    }
    secret: {
        token: string
    }
}

export interface IPostMessageLikeResponse {
    message: string
    likeCount: number
}

export interface IDeleteMessageRequest {
    uri: {
        planetId: string
        messageId: string
    }
    secret: {
        token: string
    }
}
