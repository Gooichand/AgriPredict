'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user, isGuest } = useAuth()

  useEffect(() => {
    if (user || isGuest) {
      router.push('/crop-setup')
    } else {
      router.push('/login')
    }
  }, [router, user, isGuest])

  return null
}