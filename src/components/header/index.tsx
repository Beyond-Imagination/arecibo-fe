import Image from 'next/image'

export default function Header() {
    return (
        <div>
            <div className="flex w-full m-8 px-4">
                <Image src="/images/arecibo2.png" width={64} height={64} alt="arecibo logo" />
                <p className="text-4xl m-4">Arecibo</p>
            </div>
            <div className="flex-1 mx-8 border-t-2 border-black"></div>
        </div>
    )
}
