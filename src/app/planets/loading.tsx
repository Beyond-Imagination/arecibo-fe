import { MessageListLoading } from '@/components/loading'

export default function Loading() {
    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <div className="flex flex-row justify-between w-full my-2">
                <div className="animate-pulse rounded-lg w-full h-9 bg-neutral-300 dark:bg-[#ffffff26]" />
            </div>
            <MessageListLoading />
        </div>
    )
}
