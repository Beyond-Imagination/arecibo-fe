import Image from 'next/image'
import { useAlien } from '@/hooks'
import AlienOption from '@/components/aliens/alienOption'

export default function Header() {
    const alien = useAlien()
    return (
        <div>
            <div className="flex w-full px-12 py-8 justify-between">
                <div className="flex items-center">
                    <Image src="/images/arecibo2.png" className="flex-none" width={64} height={64} alt="arecibo logo" />
                    <p className="text-4xl m-4">Arecibo</p>
                </div>
                <div className="flex items-center">
                    <Image src="/images/alien.png" className="flex-none" width={32} height={32} alt="Alien Image" />
                    <p className="text-xl mx-2">{alien.nickname}</p>
                    <AlienOption />
                </div>
            </div>
            <div className="flex-1 me-8 ms-4 border-t-2"></div>
            {/* 가로선 */}
        </div>
    )
}
