import "./globals.css"
import { Space_Grotesk } from "next/font/google"
import type React from "react"
import { ColorSchemeProvider } from "@/contexts/ColorSchemeContext"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata = {
  title: "Artistry Display",
  description: "A fusion of function and digital art",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${spaceGrotesk.className} antialiased h-full`}>
        <ColorSchemeProvider>{children}</ColorSchemeProvider>
      </body>
    </html>
  )
}

