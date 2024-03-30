import { PlanetSubscribeLoading } from '@/components/loading'

export default function Loading() {
    return (
        <div className="w-full h-full p-6">
            <p className="text-4xl my-2">Subscribe</p>
            <div className="p-6">
                <div className="grid grid-cols-5 grid-rows-1 border-b-2 px-2 pb-2">
                    <p className="text-center text-xl">Planet Name</p>
                    <p className="text-center text-xl">Category</p>
                    <p className="col-span-2 text-center text-xl">Description</p>
                    <p className="text-center text-xl">Subscription</p>
                </div>
                <PlanetSubscribeLoading />
            </div>
        </div>
    )
}
