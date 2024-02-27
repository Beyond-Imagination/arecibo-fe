'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { useAlien } from '@/providers'
import { IUpdateNicknameRequest } from '@/types'
import { updateNickname } from '@/api'
import FormError from '@/components/formError'
import Link from 'next/link'

interface Inputs {
    nickname: string
}

export default function Page() {
    const { alien, updateAlien } = useAlien()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage = errors?.nickname?.message
    const mutation = useMutation({
        mutationFn: (request: IUpdateNicknameRequest) => {
            return updateNickname(request)
        },
        onSuccess: async () => {
            alien.nickname = getValues('nickname')
            updateAlien(alien)
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
                    token: alien.jwt,
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
                            {...register('nickname', { required: 'nickname is required' })}
                            readOnly={isSubmitting || mutation.isLoading}
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
                            disabled={isSubmitting || mutation.isLoading}
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
