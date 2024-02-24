import Image from 'next/image'
import BarLoader from 'react-spinners/BarLoader'
import FadeLoader from 'react-spinners/FadeLoader'

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

export function TextEditorLoading() {
    return <div className="border rounded-lg animate-pulse w-full h-28 p-2 bg-neutral-300 dark:bg-[#ffffff26]" />
}

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

function CommentSkeleton() {
    return (
        <div className="border-l-2 w-full px-4 mb-4">
            <div className="animate-pulse rounded-lg h-24 w-full bg-neutral-300 dark:bg-[#ffffff26]" />
            <div className="border-l-2 w-full px-4 mx-2 mt-2">
                <div className="animate-pulse rounded-lg h-24 w-full bg-neutral-300 dark:bg-[#ffffff26]" />
            </div>
        </div>
    )
}

function CommentListSkeleton() {
    return (
        <div className="flex flex-col border-t-2 items-center py-4 px-4">
            <CommentSkeleton />
            <CommentSkeleton />
        </div>
    )
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
                <CommentListSkeleton />
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

export function CommentFormLoading() {
    return (
        <div className="border flex flex-col rounded-b items-center w-full h-16 bg-white dark:bg-[#18191b]">
            <FadeLoader color="#666666" />
        </div>
    )
}
