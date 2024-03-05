export interface IAlien {
    jwt: string
    nickname: string
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

export interface ILoginResponse extends IAlien {}

export interface IGetAlienDetailResponse {
    nickname: string
    lastNicknameUpdateTime: Date
}
