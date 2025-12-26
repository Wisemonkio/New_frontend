'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EmployeeDashboard from '@/components/EmployeeDashboard'

export default function EmployeeOnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
      return
    }

    // Check if user is employee
    const roleName = localStorage.getItem('roleName')
    if (roleName?.toLowerCase() !== 'employee') {
      // Not an employee, redirect based on organization status
      const organizationId = localStorage.getItem('organizationId')
      if (organizationId) {
        fetch(`/api/v1/organizations/${organizationId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const org = data.data || data
            const status = org.setup_status || org.setupStatus
            if (status === 'completed') {
              router.push('/dashboard')
            } else {
              router.push('/onboarding')
            }
          })
          .catch(() => {
            router.push('/onboarding')
          })
      } else {
        router.push('/onboarding')
      }
    }
  }, [router])

  return <EmployeeDashboard />
}

