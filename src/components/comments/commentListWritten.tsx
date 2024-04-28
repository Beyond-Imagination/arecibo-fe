import CommentWritten from '@/components/comments/commentWritten'
import { ICommentWritten } from '@/types'

interface Props {
    comments: ICommentWritten[]
}

export default function CommentListWritten({ comments }: Props) {
    return <div>{comments && comments.map(comment => <CommentWritten key={comment._id} comment={comment} />)}</div>
}
