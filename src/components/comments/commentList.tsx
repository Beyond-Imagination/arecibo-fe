import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Comment from './comment'
import { getComments } from '@/api'
import { useAuthorization } from '@/providers'
import Paginate from '@/components/paginate'

interface Props {
    planetId: string
    messageId: string
}
export default function CommentList({ planetId, messageId }: Props) {
    const searchParams = useSearchParams()
    const [page, setPage] = useState<number>(1)

    // TODO: query 정보 내부에서 state로 관리
    const query = {
        page: page,
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }

    const auth = useAuthorization()
    const { data } = useSuspenseQuery({
        queryKey: ['commentList', planetId, messageId, query, auth],
        queryFn: () => getComments(planetId, messageId, query, auth),
        refetchOnWindowFocus: false,
    })

    return (
        <div className="flex flex-col border-t-2 mt-2 mx-2">
            <div className="pb-3">{data.comments && data.comments.map(comment => <Comment key={comment._id} comment={comment} />)}</div>
            {data.page && <Paginate page={data.page} setPage={setPage} />}
        </div>
    )
}
