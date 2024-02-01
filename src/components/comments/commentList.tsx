import { IComment } from '@/types/comment'
import Comment from './comment'

interface Props {
    comments: IComment[]
}
export default function CommentList({ comments }: Props) {
    return (
        <div className="flex flex-col border-t-2 px-2 mt-2 mx-2">
            <div className="pb-3">{comments && comments.map(comment => <Comment key={comment._id} comment={comment} />)}</div>
            {/*TODO: add comment paginate*/}
        </div>
    )
}
