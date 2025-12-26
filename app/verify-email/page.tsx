'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import VerifyEmail from '@/components/VerifyEmail'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailParam = searchParams.get('email')
    const storedEmail = localStorage.getItem('userEmail') || localStorage.getItem('email')
    
    const userEmail = emailParam || storedEmail
    
    if (!userEmail) {
      // No email found, redirect to signup
      router.push('/signup')
      return
    }
    
    setEmail(userEmail)
  }, [searchParams, router])

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-grey-600">Loading...</p>
      </div>
    )
  }

  return <VerifyEmail email={email} />
}


