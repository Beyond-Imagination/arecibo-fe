import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { IAlien, ILoginRequest, ILoginResponse } from '@/types'
import { postLogin } from '@/api'
import { useCredential } from '@/hooks'
import { AuthLoading } from '@/components/loading'

interface IAuthContext {
    alien: IAlien
    updateAlien: (updatedAlien: IAlien) => void
}

const authContext = createContext<IAuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [alien, setAlien] = useState<IAlien | null>(null)
    const { mutate } = useMutation({
        mutationFn: (body: ILoginRequest) => {
            return postLogin(body)
        },
        onSuccess: (alien: ILoginResponse) => {
            setAlien(alien) // TODO: login 정보 timeout 구현
        },
    })

    const credential = useCredential()
    useEffect(() => {
        if (credential) {
            const request: ILoginRequest = {
                body: {
                    serverUrl: credential?.serverUrl,
                },
                secret: {
                    token: credential?.token,
                },
            }
            mutate(request)
        }
    }, [credential])

    const updateAlien = (updatedAlien: IAlien) => {
        setAlien(updatedAlien)
    }

    if (!credential || !alien) {
        return <AuthLoading />
    }

    return (
        <authContext.Provider value={{ alien, updateAlien }}>
            <>{children}</>
        </authContext.Provider>
    )
}

export const useAlien = (): IAuthContext => {
    return useContext(authContext)!
}
