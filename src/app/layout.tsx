'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from '@/components/header'
import Menu from '@/components/menu'
import { AuthProvider } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
            },
            mutations: {
                useErrorBoundary: true,
                retry: 1,
            },
        },
    })

    return (
        <html lang="en" className="flex flex-col">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <Header />
                        <div className="flex flex-row p-4">
                            <Menu />
                            {children}
                        </div>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
