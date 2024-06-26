import { SERVER_URL } from '@/config'
import { IAuthorization, IGetSubscribablePlanetsResponse } from '@/types'

export async function getSubscribablePlanets(auth: IAuthorization): Promise<IGetSubscribablePlanetsResponse> {
    const res = await fetch(`${SERVER_URL}/v1/planets`, {
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
