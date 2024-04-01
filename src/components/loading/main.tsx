import Image from 'next/image'
import BarLoader from 'react-spinners/BarLoader'

export function AuthLoading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <Image src="/images/arecibo2.png" width={128} height={128} alt="arecibo logo" className="animate-bounce my-2" />
                <BarLoader color="#334288" />
            </div>
        </div>
    )
}
