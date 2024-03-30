import { SubscribeToggle } from '@/components/planets/subscribeToggle'
import { IPlanet } from '@/types'

interface Props {
    planet: IPlanet
    isSubscribed: boolean
}

export default function SubscribablePlanet({ planet, isSubscribed }: Props) {
    return (
        <div className="border grid grid-flow-row grid-cols-5 grid-rows-1 gap-3 my-2 px-2 py-4 items-center">
            <p className="border-r-2 text-center text-lg">{planet.title}</p>
            <p className="border-r-2 text-center text-lg">{planet.category}</p>
            <p className="border-r-2 col-span-2 text-xs px-2">{planet.description}</p>
            <SubscribeToggle planetId={planet._id} isSubscribed={isSubscribed} />
        </div>
    )
}
