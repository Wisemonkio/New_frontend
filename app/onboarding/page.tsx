'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchOrganization } from '@/lib/organization-api'
import OnboardingPage from '@/components/OnboardingPage'

export default function OnboardingRoute() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
      return
    }

    // Check if user is employee (employees shouldn't see this page)
    const roleName = localStorage.getItem('roleName')
    if (roleName?.toLowerCase() === 'employee') {
      router.push('/employee-onboarding')
      return
    }

    // Check organization setup status
    const organizationId = localStorage.getItem('organizationId')
    if (organizationId) {
      fetchOrganization(organizationId).then((response) => {
        if (response.success && response.data) {
          const status = response.data.setup_status || response.data.setupStatus
          
          // If setup completed, redirect to dashboard
          if (status === 'completed') {
            router.push('/dashboard')
          } else {
            // Update organization in localStorage
            localStorage.setItem('organization', JSON.stringify(response.data))
            if (response.data.id) {
              localStorage.setItem('organizationId', response.data.id.toString())
            }
          }
        }
      }).catch((err) => {
        console.error('Error fetching organization:', err)
      })
    }
  }, [router])

  return <OnboardingPage />
}

