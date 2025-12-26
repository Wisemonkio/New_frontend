'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardProps {
  onSignOut?: () => void
}

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [userName, setUserName] = useState('')
  const [userInitials, setUserInitials] = useState('')

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem('user')
    let email = ''
    let displayName = ''
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        
        // Get email first
        if (user.email) {
          email = user.email
        }
        
        // Priority: first_name from users table > extract from email
        if (user.first_name) {
          displayName = user.first_name
        } else if (email) {
          // Extract part before @ from email
          const emailParts = email.split('@')
          if (emailParts.length > 0 && emailParts[0]) {
            displayName = emailParts[0]
          }
        }
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
    
    // Get email from localStorage if not in user object
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      if (!email) {
        email = storedEmail
      }
      
      // If we still don't have a name, extract from email
      if (!displayName && email) {
        const emailParts = email.split('@')
        if (emailParts.length > 0 && emailParts[0]) {
          displayName = emailParts[0]
        }
      }
    }
    
    // Set the display name and generate initials
    if (displayName) {
      setUserName(displayName)
      // Generate initials from first name or email prefix
      const firstChar = displayName[0].toUpperCase()
      // Try to get second char if available (for email, might not have second word)
      const secondChar = displayName.split(' ')[1]?.[0]?.toUpperCase() || displayName[1]?.toUpperCase() || ''
      setUserInitials(firstChar + (secondChar || ''))
    }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="bg-[#f1f8ff] min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-[250px] bg-white border-r border-grey-200 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 flex flex-col gap-10 h-full">
          {/* Logo */}
          <div className="h-8 w-40">
            <img 
              alt="Wisemonk Logo" 
              className="w-full h-full object-contain" 
              src="/images/company-image.png" 
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            {/* WORKSPACE Section */}
            <div className="flex flex-col gap-4">
              <div className="px-2">
                <p className="text-xs font-light text-grey-300 uppercase">WORKSPACE</p>
              </div>
              <div className="flex flex-col gap-1">
                {/* Home - Active */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-lg bg-primary-base/10 text-primary-base hover:bg-primary-base/20 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-bold text-base text-primary-base">Home</span>
                </Link>

                {/* People */}
                <Link
                  href="/dashboard/people"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-base text-grey-700">People</span>
                </Link>

                {/* Compliance */}
                <Link
                  href="/dashboard/compliance"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-base text-grey-700">Compliance</span>
                </Link>

                {/* Time */}
                <Link
                  href="/dashboard/time"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-base text-grey-700">Time</span>
                </Link>
              </div>
            </div>

            {/* FINANCE Section */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="px-2">
                <p className="text-xs font-light text-grey-300 uppercase">FINANCE</p>
              </div>
              <div className="flex flex-col gap-1">
                {/* Payroll */}
                <Link
                  href="/dashboard/payroll"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-base text-grey-700">Payroll</span>
                </Link>

                {/* Billing */}
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-base text-grey-700">Billing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#f1f8ff] h-[100px] flex items-center justify-between px-5 pr-10 py-5 sticky top-0 z-10">
          <div className="flex-1">
            <h1 className="font-satoshi font-bold text-2xl text-grey-700">
              {getGreeting()}, {userName}!
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/50 transition-colors">
              <svg className="w-6 h-6 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-base flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{userInitials}</span>
              </div>
              <span className="font-satoshi font-medium text-base text-grey-700">{userName}</span>
              <button className="w-4 h-4">
                <svg className="w-4 h-4 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-5 pr-10">
          <div className="flex gap-5 items-start">
            {/* Main Card */}
            <div className="bg-white rounded-lg p-5 flex-1 max-w-[770px]">
              <div className="flex flex-col gap-2 mb-10">
                <h2 className="font-satoshi font-bold text-xl text-grey-700">
                  Start building your team
                </h2>
                <p className="font-satoshi font-medium text-sm text-grey-500">
                  Get started by finishing these next steps to activate your organisation profile.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {/* Employee Card */}
                <div className="border-2 border-primary-base rounded-lg p-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary-base/5 rounded-lg p-4 w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                      <img src="/images/add-emp.svg" alt="Add Employee" className="w-8 h-8" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-satoshi font-bold text-base text-grey-700">Employee</h3>
                        <p className="font-satoshi font-medium text-xs text-grey-400 max-w-[428px]">
                          Hire a full-time professional in India through Wisemonk.
                        </p>
                      </div>
                      <button className="bg-[#87abff] hover:bg-[#6b8fff] text-white font-satoshi font-bold text-base px-4 py-2 rounded-lg transition-colors">
                        Add employee
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contractor Card */}
                <div className="border border-grey-200 rounded-lg p-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary-base/5 rounded-lg px-2 py-2.5 w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                      <img src="/images/contractor.svg" alt="Add Contractor" className="w-8 h-8" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-satoshi font-bold text-base text-grey-700">Contractor</h3>
                        <p className="font-satoshi font-medium text-xs text-grey-400">
                          Onboard an independent contractor for short-term or project-based work.
                        </p>
                      </div>
                      <button className="bg-primary-base/10 hover:bg-primary-base/20 text-primary-base font-satoshi font-bold text-base px-4 py-2 rounded-lg transition-colors">
                        Add contractor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-lg p-5 w-[300px] flex flex-col items-center gap-8">
              <div className="w-[140px] h-[129px]">
                <img 
                  alt="Help illustration" 
                  className="w-full h-full object-contain" 
                  src="/images/group-logo.svg" 
                />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h3 className="font-satoshi font-bold text-lg text-grey-700">Need help?</h3>
                <p className="font-satoshi font-medium text-sm text-grey-500">
                  Need a hand setting up your India team? Our onboarding team is just a click away.
                </p>
              </div>
              <button className="w-full h-10 flex items-center justify-center px-4 py-2 rounded-lg hover:bg-primary-base/10 transition-colors">
                <span className="font-satoshi font-bold text-base text-primary-base">Chat with us</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

