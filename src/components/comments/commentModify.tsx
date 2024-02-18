import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { IPutCommentRequest } from '@/types'
import { useAlien } from '@/providers'
import { modifyComment } from '@/api'
import { CommentAddLoading } from '@/components/loading'
import FormError from '@/components/formError'
import { Dispatch, SetStateAction } from 'react'

interface Inputs {
    text: string
}

interface Props {
    planetId: string
    messageId: string
    commentId: string
    text: string
    modifyState: Dispatch<SetStateAction<boolean>>
}

export default function CommentModify({ planetId, messageId, commentId, text, modifyState }: Props) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()

    const errorMessage = errors?.text?.message
    const alien = useAlien()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (request: IPutCommentRequest) => {
            return modifyComment(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['commentList', planetId, messageId])
            modifyState(false)
            router.forward()
        },
    })
    const onSubmit: SubmitHandler<Inputs> = (input: Inputs) => {
        const request: IPutCommentRequest = {
            uri: {
                planetId: planetId,
                messageId: messageId,
                commentId: commentId,
            },
            body: {
                text: input.text,
            },
            secret: {
                token: alien.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="block w-full p-2 my rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                {mutation.isLoading ? (
                    <CommentAddLoading />
                ) : (
                    <input
                        id="modify/text"
                        className="border rounded w-full h-16 p-2 border-[#CCCCCC] text-[#636363] dark:text-[#3E3E3E]"
                        defaultValue={text}
                        {...register('text', { required: 'text is required' })}
                    />
                )}
                <div className="flex flex-row justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting || mutation.isLoading}
                        className="rounded-lg border text-base font-medium py-1 px-6 my-1 text-[#FEFEFE] bg-[#A5A5A5] border-[#868686]"
                    >
                        Comment
                    </button>
                </div>
                {errorMessage && <FormError errorMessage={errorMessage} />}
            </form>
        </div>
    )
}
