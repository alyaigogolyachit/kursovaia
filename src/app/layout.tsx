import TheFooter from "./TheFooter"
import TheHeader from "./components/Navigation/TheHeader"
import ToasterContext from "@/context/ToasterContext"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import AuthContext from "@/context/AuthContext"

const inter = Rubik({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog App",
  description: "New Blog App",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContext>
          <ToasterContext />
          <TheHeader />
          <div className=" container ">{children}</div>
          <TheFooter />
        </AuthContext>
      </body>
    </html>
  )
}
