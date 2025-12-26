// Organization API functions

import { AuthResponse } from './api'

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
}

const ORG_API_BASE_URL = getApiBaseUrl()

export interface OrganizationResponse {
  success: boolean
  message?: string
  data?: {
    id?: string
    setup_status?: string
    setupStatus?: string
    [key: string]: any
  }
  status?: number
}

/**
 * Fetch organization details
 */
export async function fetchOrganization(organizationId: string): Promise<OrganizationResponse> {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${ORG_API_BASE_URL}/api/v1/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || data.error || 'Failed to fetch organization.',
        status: response.status,
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

/**
 * Navigate based on organization setup status and user role
 */
export function navigateBasedOnStatus(router: any) {
  const roleName = localStorage.getItem('roleName')
  const isEmployee = roleName?.toLowerCase() === 'employee'
  
  if (isEmployee) {
    router.push('/employee-onboarding')
    return
  }

  // For employers, check organization setup status
  const orgStr = localStorage.getItem('organization')
  if (orgStr) {
    try {
      const org = JSON.parse(orgStr)
      const status = org.setup_status || org.setupStatus
      
      if (status === 'completed') {
        router.push('/dashboard')
        return
      }
    } catch (e) {
      console.error('Error parsing organization:', e)
    }
  }

  // Default to onboarding if setup not completed
  router.push('/onboarding')
}


