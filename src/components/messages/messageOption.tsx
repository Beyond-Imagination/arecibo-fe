import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { OptionIcon } from '@/icon'
import { useAlien } from '@/providers'
import { deleteMessage } from '@/api'
import { IDeleteMessageRequest } from '@/types'
import Dropdown from '@/components/dropDown'

interface Props {
    planetId: string
    messageId: string
    isAuthor: boolean
    title: string
}

export default function MessageOption({ planetId, messageId, isAuthor, title }: Props) {
    const [open, setOpen] = useState(false)

    const alien = useAlien()
    const queryClient = useQueryClient()
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: IDeleteMessageRequest) => {
            return deleteMessage(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['messageList', planetId])
            router.push(`/planets?planetId=${planetId}&title=${title}`)
        },
    })

    const dropShowToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setOpen(!open)
    }
    const deleteToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const request: IDeleteMessageRequest = {
            uri: {
                planetId: planetId,
                messageId: messageId,
            },
            secret: {
                token: alien.jwt,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="inline-block">
            <button id={`message${messageId}Options`} className="px-2 text-[#636363] bg:text-white items-center" onClick={dropShowToggle}>
                <OptionIcon />
            </button>
            <Dropdown visibility={open}>
                <ul className="text-sm text-[#636363] dark:text-white">
                    {/*TODO: make Link to message modify page*/}
                    {isAuthor && (
                        <li className="rounded-t-lg hover:bg-gray-200 dark:hover:bg-[#242424]">
                            <button className="p-2">modify</button>
                        </li>
                    )}
                    {isAuthor && (
                        <li className="rounded-b-lg hover:bg-gray-200 dark:hover:bg-[#242424]">
                            <button className="p-2" onClick={deleteToggle}>
                                delete
                            </button>
                        </li>
                    )}
                    {/*TODO: add report */}
                    {!isAuthor && (
                        <li className="rounded-lg">
                            <button className="p-2">No Action</button>
                        </li>
                    )}
                </ul>
            </Dropdown>
        </div>
    )
}
