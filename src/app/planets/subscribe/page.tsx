'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import SubscribablePlanet from '@/components/planets/subscribablePlanet'
import { useAuthorization } from '@/providers'
import { getSubscribablePlanets, getSubscribedPlanets } from '@/api'

export default function Page() {
    const auth = useAuthorization()
    const { data: subscribablePlanet } = useSuspenseQuery({
        queryKey: ['subscribablePlanets', auth],
        queryFn: () => getSubscribablePlanets(auth),
        refetchOnWindowFocus: false,
    })

    const { data: subscribedPlanet } = useSuspenseQuery({
        queryKey: ['planets', auth],
        queryFn: () => getSubscribedPlanets(auth),
        refetchOnWindowFocus: false,
    })
    return (
        <div className="w-full h-full p-6">
            <p className="text-4xl my-2">Subscribe</p>
            <div className="p-6">
                <div className="grid grid-cols-5 grid-rows-1 border-b-2 px-2 pb-2">
                    <p className="text-center text-xl">Planet Name</p>
                    <p className="text-center text-xl">Category</p>
                    <p className="col-span-2 text-center text-xl">Description</p>
                    <p className="text-center text-xl">Subscription</p>
                </div>
                {/*TODO:planet 정렬 기준 추가*/}
                {subscribablePlanet.planets &&
                    subscribablePlanet.planets.map(planet => (
                        <SubscribablePlanet
                            key={planet._id}
                            planet={planet}
                            isSubscribed={subscribedPlanet.planets.some(iterator => iterator._id === planet._id)}
                        />
                    ))}
            </div>
        </div>
    )
}
