import Link from 'next/link'

import { IPlanet } from '@/types'

interface PlanetLinkProps {
    planet: IPlanet
}

export default function PlanetLink({ planet }: PlanetLinkProps) {
    return (
        <Link
            href={{
                pathname: '/planets',
                query: { planetId: planet._id, title: planet.title },
            }}
            className="block text-gray-500 m-2 text-2xl"
        >
            {planet.title}
        </Link>
    )
}
