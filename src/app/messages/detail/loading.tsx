import { MessageLoading } from '@/components/loading'

export default function Loading() {
    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <div className="flex flex-row justify-between w-full my-2">
                <div className="animate-pulse rounded-lg w-8/12 h-10 bg-white dark:bg-[#171717]" />
                <div className="animate-pulse rounded-lg w-3/12 h-10 bg-white dark:bg-[#171717]" />
            </div>
            <MessageLoading />
        </div>
    )
}
