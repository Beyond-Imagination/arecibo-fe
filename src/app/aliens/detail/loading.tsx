import { ProfileItemLoading } from '@/components/loading'

export default function Loading() {
    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <h4 className="text-3xl z-30 pb-2 border-b-2">My Profile</h4>
            <div className="py-2">
                <div className="flex flex-col profile my-4">
                    <ProfileItemLoading />
                </div>
            </div>
        </div>
    )
}
