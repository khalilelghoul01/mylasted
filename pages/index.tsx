import type { NextPage } from 'next'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  return (
    <div>
      <button
        onClick={() => {
          signIn()
          router.push('/api/auth/signin')
        }}
      >
        hello world
      </button>
      <button
        onClick={() => {
          signOut()
        }}
      >
        sign out
      </button>
    </div>
  )
}

export default Home
