import { IComment } from '@/types'
import Comment from './comment'

interface Props {
    comments: IComment[]
}
export default function CommentList({ comments }: Props) {
    return (
        <div className="flex flex-col w-full mt-2 space-y-2">
            <div className="pb-3">{comments && comments.map(comment => <Comment key={comment._id} comment={comment} />)}</div>
            {/*TODO: add comment paginate*/}
        </div>
    )
}
