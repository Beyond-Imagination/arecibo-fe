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

export interface ILoginResponse extends IAlien {}
