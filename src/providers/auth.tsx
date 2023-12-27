import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { IAlien, ILoginRequest, ILoginResponse } from '@/types'
import { postLogin } from '@/api'
import { useCredential } from '@/hooks'

const authContext = createContext<IAlien | null>(null)

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

    if (!credential || !alien) {
        return <div>loading</div> // TODO: loading 컴포넌트 구현
    }

    return (
        <authContext.Provider value={{ jwt: alien.jwt, nickname: alien.nickname }}>
            <>{children}</>
        </authContext.Provider>
    )
}

export const useAlien = (): IAlien => {
    return useContext(authContext)!
}
