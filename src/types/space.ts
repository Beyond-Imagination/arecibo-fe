export interface ICredential {
    token: string
    serverUrl: string
}

interface cssProperty {
    name: string
    value: string
}

export interface ITheme {
    properties: cssProperty[]
    idDark: boolean
}

export interface Team {
    id: string
    name: string
    memberships: [Membership]
}

interface Membership {
    member: Member
}

interface Member {
    id: string
    username: string
}
