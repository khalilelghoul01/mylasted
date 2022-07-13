import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = React.useState(false)
  const toggleDark = (dark: boolean) => {
    setIsDark(dark)
  }

  return (
    <SessionProvider>
      <div
        className={
          (isDark ? 'dark' : '') + ' ease-in-out duration-700 min-h-screen'
        }
      >
        <Navbar toggleTheme={toggleDark} />

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
