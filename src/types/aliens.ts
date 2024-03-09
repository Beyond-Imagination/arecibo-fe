export interface IAuthorization {
    jwt: string
}

export interface IAlien {
    nickname: string
    lastNicknameUpdateTime: Date
}

export interface ILoginRequest {
    body: {
        serverUrl: string
    }
    secret: {
        token: string
    }
}

export interface IUpdateNicknameRequest {
    body: {
        nickname: string
    }
    secret: {
        token: string
    }
}

export interface ILoginResponse extends IAuthorization {}

export interface IGetAlienDetailResponse extends IAlien {}
