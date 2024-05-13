import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { IPostCommentRequest } from '@/types/comment'
import { postComment } from '@/api/comment'
import { useAuthorization } from '@/providers'
import FormError from '@/components/formError'
import { CommentFormLoading } from '@/components/loading'

interface Props {
    data: {
        messageId: string
        parentCommentId: string
        planetId: string
    }
    isShow: () => void
}

interface Inputs {
    text: string
}

export default function CommentAdd({ data, isShow }: Props) {
    const {
        register,
        handleSubmit,
        resetField,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage: string | undefined = errors?.text?.message

    const auth = useAuthorization()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (request: IPostCommentRequest) => {
            return postComment(request)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['message', data.planetId, data.messageId] }),
                queryClient.invalidateQueries({ queryKey: ['messageList', data.planetId] }),
                queryClient.invalidateQueries({ queryKey: ['commentList', data.planetId, data.messageId] }),
                queryClient.invalidateQueries({ queryKey: ['commentListWritten', auth] }),
                queryClient.invalidateQueries({ queryKey: ['messageListWritten', auth] }),
            ])
            router.forward()
            isShow()
        },
    })
    const onSubmit: SubmitHandler<Inputs> = (input: Inputs) => {
        const request: IPostCommentRequest = {
            body: {
                text: input.text,
            },
            uri: {
                planetId: data.planetId,
                messageId: data.messageId,
                parentCommentId: data.parentCommentId,
            },
            secret: {
                token: auth.jwt,
            },
        }
        resetField('text')
        mutation.mutate(request)
    }

    return (
        <div className="block w-full pt-2 my rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded mx-2 bg-[#A5A5A5] dark:bg-[#ffffff26]">
                    <div className="p-2 text-white">Write your comment</div>
                    {mutation.isPending ? (
                        <CommentFormLoading />
                    ) : (
                        <input
                            id="create/text"
                            className="border rounded-b w-full h-16 p-2 dark:bg-[#18191b]"
                            {...register('text', {
                                required: 'text is required',
                                validate: value => value.trim() !== '' || 'text is required',
                            })}
                        />
                    )}
                </div>
                {errorMessage && <FormError errorMessage={errorMessage} />}
                <div className="flex flex-row justify-end p-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                        className="border rounded-lg text-base font-medium py-1 px-6 my-1 hover:border-[#afafbe] hover:dark:border-[#ffffff80]"
                    >
                        Comment
                    </button>
                </div>
            </form>
        </div>
    )
}
