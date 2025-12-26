// Authentication utility functions for storing and managing auth data

export interface AuthResponseData {
  accessToken?: string
  refreshToken?: string
  user?: any
  roles?: Array<{
    role_id?: number
    roleId?: number
    id?: number
    role_name?: string
    roleName?: string
    name?: string
  } | string>
  organization?: any
  token?: string // Fallback for token
}

/**
 * Store authentication data in localStorage
 */
export function storeAuthData(data: AuthResponseData) {
  // Store tokens
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken)
  }
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken)
  }
  // Fallback: if token exists but accessToken doesn't
  if (data.token && !data.accessToken) {
    localStorage.setItem('accessToken', data.token)
  }

  // Store user data
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user))
    if (data.user.email) {
      localStorage.setItem('userEmail', data.user.email)
    }
  }

  // Extract and store role information
  let roleId: number | null = null
  let roleName: string | null = null

  if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
    const firstRole = data.roles[0]
    if (firstRole && typeof firstRole === 'object') {
      roleId = firstRole.role_id || firstRole.roleId || firstRole.id || null
      roleName = firstRole.role_name || firstRole.roleName || firstRole.name || null
    } else if (typeof firstRole === 'string') {
      roleName = firstRole
    }
  }

  if (roleId !== null && roleId !== undefined) {
    localStorage.setItem('roleId', roleId.toString())
  }
  if (roleName) {
    localStorage.setItem('roleName', roleName)
    // Set navigation based on role
    const isEmployee = roleName.toLowerCase() === 'employee'
    if (isEmployee) {
      localStorage.setItem('currentPage', 'employee-onboarding')
    } else {
      localStorage.setItem('currentPage', 'onboarding')
    }
  }

  // Store organization data
  if (data.organization) {
    localStorage.setItem('organization', JSON.stringify(data.organization))
    const orgId = data.organization.id || data.organization._id
    if (orgId) {
      localStorage.setItem('organizationId', orgId.toString())
    }
  }
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}

/**
 * Get stored user data
 */
export function getUserData(): any | null {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

/**
 * Get stored organization ID
 */
export function getOrganizationId(): string | null {
  return localStorage.getItem('organizationId')
}

