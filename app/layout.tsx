import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MetaMaskClientProvider from "@/components/MetaMaskClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trace the Change - Know Where Your Donations Go",
  description: "Track your charitable donations with blockchain technology for complete transparency.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MetaMaskClientProvider>
            {children}
          </MetaMaskClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
