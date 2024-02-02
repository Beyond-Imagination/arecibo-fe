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
    return <div className="border rounded-lg animate-pulse w-full h-28 p-2 bg-[#E3E3E3]" />
}

function MessageSkeleton() {
    return (
        <div className="block rounded-lg m-2 bg-neutral-200 dark:bg-neutral-700">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row items-center justify-start align-center w-full my-1">
                    <div className="rounded-lg w-6 h-6 mx-2 bg-neutral-300 dark:bg-neutral-600" />
                    <div className="rounded-lg w-4/12 h-6 bg-neutral-300 dark:bg-neutral-600" />
                </div>
                <div className="rounded-lg w-2/12 h-6 m-1 bg-neutral-300 dark:bg-neutral-600" />
            </div>
            <div className="pt-1 w-full">
                <div className="rounded-lg h-6 m-2 bg-neutral-300 dark:bg-neutral-600" />
                <div className="rounded-lg h-32 m-2 bg-neutral-300 dark:bg-neutral-600" />
            </div>
            <div className="flex flex-row justify-start w-full pt-2">
                <div className="rounded-lg w-2/12 h-6 m-2 bg-neutral-300 dark:bg-neutral-600" />
                <div className="rounded-lg w-2/12 h-6 m-2 bg-neutral-300 dark:bg-neutral-600" />
            </div>
        </div>
    )
}

export function MessageLoading() {
    return (
        <div className="animate-pulse flex flex-col rounded-lg w-full mt-2 p-2 space-y-2 bg-white dark:bg-neutral-900">
            <MessageSkeleton />
            <div className="rounded-lg h-8 m-2 pt-2 bg-neutral-200 dark:bg-neutral-700" />
        </div>
    )
}

export function MessageListLoading() {
    return (
        <div className="animate-pulse flex flex-col rounded-lg w-full mt-2 p-2 space-y-2 bg-white dark:bg-neutral-900">
            <MessageSkeleton />
            <MessageSkeleton />
            <div className="rounded-lg h-8 m-2 pt-2 bg-neutral-200 dark:bg-neutral-700" />
        </div>
    )
}

export function CommentAddLoading() {
    return (
        <div className="flex flex-col rounded items-center w-full h-16 bg-white">
            <FadeLoader color="#646464" />
        </div>
    )
}
