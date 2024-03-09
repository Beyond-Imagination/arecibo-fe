import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter, usePathname } from 'next/navigation'

import { useAuthorization } from '@/providers'
import { getPlanets } from '@/api'
import PlanetLink from '@/components/menu/planetLink'

export default function Menu() {
    const auth = useAuthorization()
    const router = useRouter()
    const pathName = usePathname()

    const { data } = useQuery(['planets', auth], getPlanets, {
        enabled: !!auth,
        refetchOnWindowFocus: false,
        suspense: true,
    })

    useEffect(() => {
        // 최초 진입시 path 를 organization planet 으로 변경
        if (pathName === '/') {
            const planet = data?.planets.find(element => element.category === 'organization')
            if (planet) {
                router.replace(`/planets?planetId=${planet._id}&title=${planet.title}`)
            }
        }
    })

    return (
        <div className="w-1/4 min-h-full pt-6">
            <div className="border-t-2"></div>
            <p className="text-4xl m-2">Planet</p>
            <div className="border-t-2"></div>
            {/*TODO: planet 정렬 기준 추가*/}
            {data?.planets.map(planet => <PlanetLink key={planet._id} planet={planet} />)}
        </div>
    )
}
