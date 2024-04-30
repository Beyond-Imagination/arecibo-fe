import Link from 'next/link'

import { IPlanet } from '@/types'
import { planetStore } from '@/store'

interface PlanetLinkProps {
    planet: IPlanet
}

export default function PlanetLink({ planet }: PlanetLinkProps) {
    const { setPlanet } = planetStore()
    const planetClick = () => {
        setPlanet(planet)
    }
    return (
        <Link href={'/planets'} onClick={planetClick} className="block text-gray-500 m-2 text-2xl">
            {planet.title}
        </Link>
    )
}
