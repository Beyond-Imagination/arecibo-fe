import { SERVER_URL } from '@/config'
import { IAuthorization, IGetAlienDetailResponse, ILoginRequest, ILoginResponse, IUpdateNicknameRequest } from '@/types'
import { QueryFunctionContext } from 'react-query'

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

export async function getAlienDetail({ queryKey }: QueryFunctionContext<[string, IAuthorization]>): Promise<IGetAlienDetailResponse> {
    const [, auth] = queryKey
    const res = await fetch(`${SERVER_URL}/v1/aliens/detail`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.jwt}` },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
