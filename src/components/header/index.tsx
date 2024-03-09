import Image from 'next/image'
import Link from 'next/link'
import { useAlien } from '@/hooks'

export default function Header() {
    const alien = useAlien()
    return (
        <div>
            <div className="flex w-full px-12 py-8 justify-between">
                <div className="flex">
                    <Image src="/images/arecibo2.png" width={64} height={64} alt="arecibo logo" />
                    <p className="text-4xl m-4">Arecibo</p>
                </div>
                <Link href={'/aliens/detail'} className="flex items-baseline">
                    <Image src="/images/alien.png" width={48} height={48} alt="Alien Image" />
                    <p>{alien.nickname}</p>
                </Link>
            </div>
            <div className="flex-1 me-8 ms-4 border-t-2"></div>
            {/* 가로선 */}
        </div>
    )
}
