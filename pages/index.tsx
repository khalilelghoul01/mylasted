import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  return (
    <button
      onClick={() => {
        router.push('/api/auth/signin')
      }}
    >
      hello world
    </button>
  )
}

export default Home
