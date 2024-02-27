import { useQuery } from 'react-query'
import { useSearchParams } from 'next/navigation'

import Comment from './comment'
import { getComments } from '@/api'
import { IGetCommentListResponse } from '@/types'
import { useAlien } from '@/providers'
import Paginate from '@/components/paginate'

interface Props {
    planetId: string
    messageId: string
}
export default function CommentList({ planetId, messageId }: Props) {
    const searchParams = useSearchParams()

    // TODO: query 정보 내부에서 state로 관리
    const query = {
        page: searchParams.get('page') || '1',
        size: searchParams.get('size') || '10',
        sort: searchParams.get('sort') || 'latest',
    }

    const { alien } = useAlien()
    const data =
        useQuery(['commentList', planetId, messageId, query, alien], getComments, {
            enabled: !!alien && !!planetId && !!messageId,
            refetchOnWindowFocus: false,
            suspense: true,
        })?.data || ({} as IGetCommentListResponse)

    return (
        <div className="flex flex-col border-t-2 mt-2 mx-2">
            <div className="pb-3">{data.comments && data.comments.map(comment => <Comment key={comment._id} comment={comment} />)}</div>
            {data.page && <Paginate page={data.page} />}
        </div>
    )
}
