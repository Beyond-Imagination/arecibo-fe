import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { IAuthorization, ILoginRequest, ILoginResponse } from '@/types'
import { postLogin } from '@/api'
import { useCredential } from '@/hooks'
import { AuthLoading } from '@/components/loading'

const authContext = createContext<IAuthorization | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authorization, setAuthorization] = useState<IAuthorization | null>(null)
    const { mutate } = useMutation({
        mutationFn: (body: ILoginRequest) => {
            return postLogin(body)
        },
        onSuccess: (authorization: ILoginResponse) => {
            setAuthorization(authorization) // TODO: login 정보 timeout 구현
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

    if (!credential || !authorization) {
        return <AuthLoading />
    }

    return (
        <authContext.Provider value={{ jwt: authorization.jwt }}>
            <>{children}</>
        </authContext.Provider>
    )
}

export const useAuthorization = (): IAuthorization => {
    return useContext(authContext)!
}
