'use client'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { UnprivilegedEditor } from 'react-quill'
import { Delta, Sources } from 'quill'
import { postMessage } from '@/api'
import { IPostMessageRequest } from '@/types'
import { useAlien } from '@/providers'
import TextEditor from '@/components/textEditor'
import FormError from '@/components/formError'

type Inputs = {
    title: string
    content: string
}

export default function Create() {
    const searchParams = useSearchParams()
    const planetId = searchParams.get('planetId') || ''
    const title = searchParams.get('title') || ''

    if (planetId === '' || title === '') {
        throw new Error('400 Bad Request')
    }

    const alien = useAlien()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()

    useEffect(() => {
        register('content', { required: 'content is required' })
    }, [register])

    const errorMessage: string | undefined = errors?.title?.message || errors?.content?.message

    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (body: IPostMessageRequest) => {
            return postMessage(body)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['messageList', planetId] })
            router.push(`/planets?planetId=${planetId}&title=${title}`)
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const request: IPostMessageRequest = {
            body: {
                title: data.title,
                content: data.content,
            },
            uri: {
                planetId: planetId,
            },
            secret: {
                token: alien.jwt,
            },
        }
        mutation.mutate(request)
    }

    const handleChange = (value: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => {
        if (editor.getLength() === 1) {
            setValue('content', '')
        } else {
            setValue('content', value)
        }
    }

    // toolbar options
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }, { font: [] }],
            [{ align: [] }, 'bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ indent: '+1' }, { indent: '-1' }, { list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
        ],
    }
    const formats = [
        'header',
        'font',
        'align',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'indent',
        'list',
        'bullet',
        'blockquote',
        'code-block',
        'link',
        'image',
    ]

    return (
        <div className="flex flex-col justify-start w-full min-h-screen p-12">
            <p className="text-4xl p-2">{title}</p>
            <div className="block w-full p-6 my rounded-lg bg-white dark:bg-neutral-700">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-2">
                        <input
                            id="create/title"
                            className="border rounded w-full h-10 p-1 border-[#CCCCCC] dark:text-[#3E3E3E]"
                            placeholder="Title"
                            {...register('title', { required: 'title is required' })}
                        />
                    </div>
                    <div className="p-2 dark:text-[#3E3E3E]">
                        <TextEditor
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange={handleChange}
                            className="border rounded bg-white"
                            placeholder="Text"
                        />
                    </div>
                    <div className="flex flex-row justify-end gap-2 px-2">
                        <button
                            type="button"
                            className="rounded-lg border text-base font-medium py-1 px-6 my-1 text-[#3E3E3E] bg-white border-[#868686]"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg border text-base font-medium py-1 px-6 my-1 text-[#FEFEFE] bg-[#A5A5A5] border-[#868686]"
                        >
                            Post
                        </button>
                    </div>
                    {errorMessage && <FormError errorMessage={errorMessage} />}
                </form>
            </div>
        </div>
    )
}
