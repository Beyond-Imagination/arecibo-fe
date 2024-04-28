import { SERVER_URL } from '@/config'
import {
    IAuthorization,
    IGetAlienDetailResponse,
    IGetSubscribedPlanetsResponse,
    IGetWrittenCommentResponse,
    IGetWrittenMessageResponse,
    ILoginRequest,
    ILoginResponse,
    ISubscribePlanetRequest,
    IUnsubscribePlanetRequest,
    IUpdateNicknameRequest,
} from '@/types'

export async function postLogin(request: ILoginRequest): Promise<ILoginResponse> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/login/space`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function updateNickname(request: IUpdateNicknameRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/nickname`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${request.secret.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        const body = await res.json()
        if (body.code === 634) {
            throw new Error('Nickname already exists. Please choose a different one.')
        } else {
            throw new Error(body.message)
        }
    }
}

export async function getAlienDetail(auth: IAuthorization): Promise<IGetAlienDetailResponse> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/detail`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.jwt}` },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getSubscribedPlanets(auth: IAuthorization): Promise<IGetSubscribedPlanetsResponse> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/planets/subscribe`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.jwt}`,
        },
    })

    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function subscribePlanet(request: ISubscribePlanetRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/planets/${request.uri.planetId}/subscribe`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function unsubscribePlanet(request: IUnsubscribePlanetRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/aliens/planets/${request.uri.planetId}/subscribe`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function getWrittenMessages(auth: IAuthorization, query: object): Promise<IGetWrittenMessageResponse | IGetWrittenCommentResponse> {
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/aliens/messages?${searchParams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.jwt}`,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function getWrittenComments(auth: IAuthorization, query: object): Promise<IGetWrittenCommentResponse> {
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/aliens/comments?${searchParams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.jwt}`,
        },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
