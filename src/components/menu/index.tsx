import { useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

import { useAuthorization } from '@/providers'
import { getSubscribedPlanets } from '@/api'
import PlanetLink from '@/components/menu/planetLink'
import { Plus } from '@/icon'
import { planetStore } from '@/store'

export default function Menu() {
    const auth = useAuthorization()
    const router = useRouter()
    const pathName = usePathname()
    const { planet, setPlanet } = planetStore()

    const { data } = useSuspenseQuery({
        queryKey: ['planets', auth],
        queryFn: () => getSubscribedPlanets(auth),
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        // 최초 진입시 path 를 organization planet 으로 변경
        if (pathName === '/') {
            const organizationPlanet = data?.planets.find(element => element.category === 'organization')
            if (organizationPlanet) {
                if (planet._id === '') {
                    setPlanet(organizationPlanet)
                }
                router.replace(`/planets?planetId=${planet._id}&title=${planet.title}`)
            }
        }
    })

    return (
        <div className="w-1/4 min-h-full pt-6">
            <div className="border-t-2"></div>
            <div className="flex items-center">
                <p className="w-10/12 text-4xl m-2">Planet</p>
                <Link href={'/planets/subscribe'} className="m-2">
                    <Plus />
                </Link>
            </div>
            <div className="border-t-2"></div>
            {/*TODO: planet 정렬 기준 추가*/}
            {data?.planets.map(planet => <PlanetLink key={planet._id} planet={planet} />)}
        </div>
    )
}
