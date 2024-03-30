import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { subscribePlanet, unsubscribePlanet } from '@/api'
import { useAuthorization } from '@/providers'
import { ISubscribePlanetRequest, IUnsubscribePlanetRequest } from '@/types'

interface Props {
    planetId: string
    isSubscribed: boolean
}

export function SubscribeToggle({ planetId, isSubscribed }: Props) {
    const [subscribed, setSubscribed] = useState(isSubscribed)
    const queryClient = useQueryClient()
    const auth = useAuthorization()
    const onSuccess = async () => {
        await queryClient.invalidateQueries({ queryKey: ['planets', auth] })
    }
    const subscribeMutation = useMutation({
        mutationFn: (request: ISubscribePlanetRequest) => {
            return subscribePlanet(request)
        },
        onSuccess: onSuccess,
    })
    const unsubscribeMutation = useMutation({
        mutationFn: (request: IUnsubscribePlanetRequest) => {
            return unsubscribePlanet(request)
        },
        onSuccess: onSuccess,
    })

    const toggle = () => {
        if (!subscribeMutation.isPending && !unsubscribeMutation.isPending) {
            setSubscribed(!subscribed)
            const request = {
                uri: {
                    planetId: planetId,
                },
                secret: {
                    token: auth.jwt,
                },
            }
            if (!subscribed) {
                subscribeMutation.mutate(request)
            } else {
                unsubscribeMutation.mutate(request)
            }
        }
    }
    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-2 h-full bg-opacity-100" onClick={toggle}>
                <button className={`border border-r-0 rounded-l-md text-xs py-1 transition-all duration-500 ${subscribed && 'text-black'}`}>
                    subscribed
                </button>
                <button className={`border border-l-0 rounded-r-md text-xs py-1 transition-all duration-500 ${!subscribed && 'text-black'}`}>
                    unsubscribed
                </button>
            </div>
            <div
                className={`relative -translate-y-full -z-30 h-full w-1/2 transition-all duration-500 py-2 ${
                    subscribed ? 'rounded-l-md bg-[#6dfeb3]' : 'rounded-r-md translate-x-full bg-[#fe6d70]'
                }`}
            />
        </div>
    )
}
