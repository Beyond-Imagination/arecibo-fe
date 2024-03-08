import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Delta, Sources } from 'quill'
import { UnprivilegedEditor } from 'react-quill'
import TextEditor from '@/components/textEditor'
import FormError from '@/components/formError'
import { IMessageFormInputs } from '@/types'

interface Props {
    onSubmit: SubmitHandler<IMessageFormInputs>
    initValue?: IMessageFormInputs
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

export default function MessageForm({ onSubmit, initValue }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm<IMessageFormInputs>()
    const errorMessage: string | undefined = errors?.title?.message || errors?.content?.message

    useEffect(() => {
        register('content', { required: 'content is required' })
    }, [register, initValue])
    const router = useRouter()

    const handleChange = (value: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => {
        if (editor.getLength() === 1) {
            setValue('content', '')
        } else {
            setValue('content', value)
        }
    }
    return (
        <div className="border-2 block rounded-lg w-full p-6 mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2">
                    <input
                        id="create/title"
                        className="border rounded w-full h-10 p-1 px-3 dark:bg-[#18191b]"
                        placeholder="Title"
                        defaultValue={initValue && initValue.title}
                        {...register('title', { required: 'title is required' })}
                    />
                </div>
                <div className="p-2">
                    <TextEditor
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        onChange={handleChange}
                        className="dark:bg-[#18191b]"
                        defaultValue={initValue && initValue.content}
                        placeholder="Text"
                    />
                </div>
                {errorMessage && <FormError errorMessage={errorMessage} />}
                <div className="flex flex-row justify-end gap-2 px-2">
                    <button
                        type="button"
                        className="rounded-lg border text-base font-medium py-1 px-6 my-1 hover:border-[#afafbe] hover:dark:border-[#ffffff80]"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg border text-base font-medium py-1 px-6 my-1 text-white bg-blue-700"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}
