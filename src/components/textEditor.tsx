import dynamic from 'next/dynamic'
import { TextEditorLoading } from '@/components/loading'
import 'react-quill/dist/quill.snow.css'

const TextEditor = dynamic(() => import('react-quill'), {
    loading: () => <TextEditorLoading />,
})

export default TextEditor
