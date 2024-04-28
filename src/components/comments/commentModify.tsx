import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IPutCommentRequest } from '@/types'
import { useAuthorization } from '@/providers'
import { modifyComment } from '@/api'
import { CommentFormLoading } from '@/components/loading'
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
    const auth = useAuthorization()
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (request: IPutCommentRequest) => {
            return modifyComment(request)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['commentList', planetId, messageId] }),
                queryClient.invalidateQueries({ queryKey: ['commentListWritten', auth] }),
            ])
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
                token: auth.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="block w-full p-2 my rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                {mutation.isPending ? (
                    <CommentFormLoading />
                ) : (
                    <input
                        id="modify/text"
                        className="border rounded w-full h-16 p-2 bg-transparent"
                        defaultValue={text}
                        {...register('text', { required: 'text is required' })}
                    />
                )}
                {errorMessage && <FormError errorMessage={errorMessage} />}
                <div className="flex flex-row justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                        className="rounded-lg border text-base font-medium py-1 px-6 my-1 text-[#FEFEFE] bg-[#A5A5A5] border-[#868686]"
                    >
                        Comment
                    </button>
                </div>
            </form>
        </div>
    )
}
