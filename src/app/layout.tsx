'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

import Header from '@/components/header'
import Menu from '@/components/menu'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="flex flex-col">
            <body className={inter.className}>
                <Header />
                <div className="flex flex-row p-4">
                    <Menu />
                    {children}
                </div>
            </body>
        </html>
    )
}
