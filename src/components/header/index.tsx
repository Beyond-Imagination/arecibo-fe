import Image from 'next/image'
import { useAlien } from '@/providers'

export default function Header() {
    const alien = useAlien()
    return (
        <div>
            <div className="flex w-full px-12 py-8 justify-between">
                <div className="flex">
                    <Image src="/images/arecibo2.png" width={64} height={64} alt="arecibo logo" />
                    <p className="text-4xl m-4">Arecibo</p>
                </div>
                <div className="flex items-baseline">
                    <Image src="/images/alien.png" width={48} height={48} alt="Alien Image" />
                    <p>{alien.nickname}</p>
                </div>
            </div>
            <div className="flex-1 mx-8 border-t-2 border-black"></div> {/* 가로선 */}
        </div>
    )
}
