import { create } from 'zustand'
import { IMessageBasis } from '@/types'

interface messageState {
    message: IMessageBasis
    setMessage: (message: IMessageBasis) => undefined
}
export const messageStore = create<messageState>(set => ({
    message: {
        _id: '',
        title: '',
        content: '',
        commentCount: 0,
        likeCount: 0,
        isLiked: false,
        isBlind: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    setMessage: message => {
        set({ message })
    },
}))
