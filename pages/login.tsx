import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function login() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push('/')
    }
    if (status !== 'loading' && !session) {
      router.push('/api/auth/signin')
    }
  }, [session, status])
  return <div>login</div>
}

export default login
