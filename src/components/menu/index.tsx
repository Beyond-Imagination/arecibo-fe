import { useQuery } from 'react-query'

import { useAlien } from '@/providers'
import { getPlanets } from '@/api'
import PlanetLink from '@/components/menu/planetLink'

export default function Menu() {
    const alien = useAlien()

    const { data } = useQuery(['planets', alien], getPlanets, {
        enabled: !!alien,
        refetchOnWindowFocus: false,
        suspense: true,
    })

    return (
        // TODO: remove border
        <div className="border-2 border-black">
            <p className="text-4xl m-4">menu</p>
            {/*TODO: planet 정렬 기준 추가*/}
            {data?.planets.map(planet => <PlanetLink key={planet._id} planet={planet} />)}
        </div>
    )
}
