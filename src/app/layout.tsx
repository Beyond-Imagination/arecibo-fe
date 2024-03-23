'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from '@/components/header'
import Menu from '@/components/menu'
import { AuthProvider } from '@/providers'
import Newrelic from '@/components/newrelic'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 minutes
                        gcTime: 1000 * 60 * 5, // 5 minutes
                    },
                    mutations: {
                        throwOnError: true,
                        retry: 1,
                    },
                },
            }),
    )
    return (
        <html lang="en" className="flex flex-col">
            <Newrelic />
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <Header />
                        <div className="flex flex-row w-full h-full p-4">
                            <Menu />
                            {children}
                        </div>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
