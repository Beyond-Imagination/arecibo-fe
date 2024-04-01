import FadeLoader from 'react-spinners/FadeLoader'

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

export function CommentListLoading() {
    return (
        <div className="flex flex-col border-t-2 items-center py-4 px-4">
            <CommentSkeleton />
            <CommentSkeleton />
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
