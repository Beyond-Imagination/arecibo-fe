import { CommentListLoading } from './comment'

function MessageSkeleton() {
    return (
        <div className="border-2 block rounded-lg mb-3 p-6">
            <div className="animate-pulse pt-1 w-full">
                <div className="rounded-lg h-32 bg-neutral-300 dark:bg-[#ffffff26]" />
                <div className="flex flex-row justify-start mt-2">
                    <div className="rounded-3xl w-28 h-10 me-3 bg-neutral-300 dark:bg-[#ffffff26]" />
                    <div className="rounded-3xl w-28 h-10 bg-neutral-300 dark:bg-[#ffffff26]" />
                </div>
            </div>
        </div>
    )
}

export function TextEditorLoading() {
    return <div className="border rounded-lg animate-pulse w-full h-28 p-2 bg-neutral-300 dark:bg-[#ffffff26]" />
}

export function MessageLoading() {
    return (
        <div className="flex flex-col">
            <MessageSkeleton />
            <div className="border-2 block rounded-lg my-3 p-3">
                <div className="animate-pulse rounded-lg w-full h-24 mb-3 bg-neutral-300 dark:bg-[#ffffff26]" />
                <div className="flex flex-row justify-end">
                    <div className="animate-pulse rounded-lg w-32 h-8 mb-5 bg-neutral-300 dark:bg-[#ffffff26]" />
                </div>
                <CommentListLoading />
            </div>
        </div>
    )
}

export function MessageListLoading() {
    return (
        <div className="animate-pulse flex flex-col rounded-lg w-full mt-2">
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
        </div>
    )
}
