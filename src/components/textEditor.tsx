import React from 'react'
import dynamic from 'next/dynamic'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import normalizeUrl from 'normalize-url'
import 'react-quill/dist/quill.snow.css'

import { TextEditorLoading } from '@/components/loading'

interface ForwardQuillComponent extends ReactQuillProps {
    forwardRef: React.Ref<ReactQuill>
}

const TextEditor = dynamic(
    async () => {
        const Quill = (await import('quill')).default
        const MagicUrl = (await import('quill-magic-url')).default
        const Link = Quill.import('formats/link')

        class CustomLink extends Link {
            static create(value: string) {
                const url = normalizeUrl(value, { forceHttps: true })
                const node: HTMLAnchorElement = super.create(url)
                node.className = 'popupLink'
                return node
            }
        }

        Quill.register('modules/magicUrl', MagicUrl)
        Quill.register(CustomLink, true)

        const { default: QuillComponent } = await import('react-quill')
        const quill = ({ forwardRef, ...props }: ForwardQuillComponent) => <QuillComponent ref={forwardRef} {...props} />
        return quill
    },
    { loading: () => <TextEditorLoading />, ssr: false },
)
export default TextEditor
