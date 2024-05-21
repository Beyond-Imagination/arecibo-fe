'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import FormError from '@/components/formError'
import { useAlien } from '@/hooks'
import { useAuthorization } from '@/providers'
import { IUpdateNicknameRequest } from '@/types'
import { updateNickname } from '@/api'

interface Inputs {
    nickname: string
}

export default function Page() {
    const alien = useAlien()

    const auth = useAuthorization()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage = errors?.nickname?.message
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (request: IUpdateNicknameRequest) => {
            return updateNickname(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['alienDetail', auth] })
            router.push('/aliens/detail')
        },
    })
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (data.nickname === alien.nickname) {
            setError('nickname', {
                type: 'reject',
                message: 'You cannot change the nickname to the same one you are using.',
            })
        } else {
            const request: IUpdateNicknameRequest = {
                body: {
                    nickname: data.nickname,
                },
                secret: {
                    token: auth.jwt,
                },
            }
            mutation.mutate(request)
        }
    }

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <h4 className="relative text-3xl z-30 pb-2 border-b-2">My Profile</h4>
            <div className="py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col profile mt-4">
                        <label className="mb-1 font-semibold" htmlFor="modify/nickname">
                            Nickname
                        </label>
                        <input
                            id="modify/nickname"
                            defaultValue={alien.nickname}
                            className="input-item"
                            {...register('nickname', {
                                required: 'nickname is required',
                                validate: value => value.trim() !== '' || 'nickname is required',
                                maxLength: {
                                    value: 10,
                                    message: 'nickname cannot exceed 10 characters',
                                },
                            })}
                            readOnly={isSubmitting || mutation.isPending}
                        />
                        {/*TODO: display theLastNicknameUpdatedTime*/}
                        <div className="note">
                            After changing your nickname, you can change it again after 1 hour has passed since your last nickname change.
                        </div>
                    </div>
                    {errorMessage && <FormError errorMessage={errorMessage} />}
                    <div className="flex flex-row justify-start py-2">
                        <button
                            type="submit"
                            className="rounded-lg font-medium text-sm px-3 py-2.5 my-2 me-2 text-white bg-blue-700"
                            disabled={isSubmitting || mutation.isPending}
                        >
                            Update profile
                        </button>
                        <Link
                            href={'/aliens/detail'}
                            className="border rounded-lg font-medium py-2.5 px-3 my-2 hover:border-[#afafbe] hover:dark:border-[#ffffff80]"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
