import { useQuery } from 'react-query'

import { useAlien } from '@/providers'
import { getPlanets } from '@/api'

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
            {/*TODO: planet component 추가. 클릭시 planet page 로 이동*/}
            {/*TODO: planet 정렬 기준 추가*/}
            {data?.planets.map(planet => <div key={planet._id}>{planet.title}</div>)}
        </div>
    )
}
