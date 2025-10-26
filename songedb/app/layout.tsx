import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "송이버섯 & 천마 데이터베이스",
  description: "Tricholoma matsutake와 Gastrodia elata에 대한 포괄적인 정보와 연구 데이터를 제공하는 전문 플랫폼",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
