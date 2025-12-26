'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'
import { fetchOrganization } from '@/lib/organization-api'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
      return
    }

    // Check if user is employee (employees shouldn't see this dashboard)
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
          
          // If setup not completed, redirect to onboarding
          if (status !== 'completed') {
            router.push('/onboarding')
          } else {
            // Update organization in localStorage
            localStorage.setItem('organization', JSON.stringify(response.data))
          }
        }
      })
    } else {
      // No organization ID, redirect to onboarding
      router.push('/onboarding')
    }
  }, [router])

  const handleSignOut = () => {
    // Clear all auth data
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('roleId')
    localStorage.removeItem('roleName')
    localStorage.removeItem('organization')
    localStorage.removeItem('organizationId')
    localStorage.removeItem('currentPage')
    
    // Redirect to login
    router.push('/')
  }

  return <Dashboard onSignOut={handleSignOut} />
}


