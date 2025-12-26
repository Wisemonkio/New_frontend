'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/lib/api'

export default function OnboardingPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userInitials, setUserInitials] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [comingSoonTabName, setComingSoonTabName] = useState('')
  const [activeTab, setActiveTab] = useState('Home')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<'employee' | 'contractor' | null>(null)
  const employeeCardRef = useRef<HTMLDivElement>(null)
  const contractorCardRef = useRef<HTMLDivElement>(null)

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
          setUserEmail(user.email)
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
        setUserEmail(storedEmail)
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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Intersection Observer to detect which card is in view when scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when card is in the middle 60% of viewport
      threshold: 0.5
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardType = entry.target.getAttribute('data-card-type') as 'employee' | 'contractor'
          if (cardType) {
            setHoveredCard(cardType)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (employeeCardRef.current) {
      observer.observe(employeeCardRef.current)
    }
    if (contractorCardRef.current) {
      observer.observe(contractorCardRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabName: string) => {
    if (tabName !== 'Home') {
      e.preventDefault()
      setComingSoonTabName(tabName)
      setShowComingSoonModal(true)
    } else {
      setActiveTab('Home')
    }
  }

  const handleGotIt = () => {
    setShowComingSoonModal(false)
    // Stay on current page (onboarding page)
    // The activeTab state will maintain which tab was clicked
  }

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear all local storage
      localStorage.clear()
      // Redirect to login page
      router.push('/')
    }
  }

  return (
    <div className="bg-[#f1f8ff] min-h-screen flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50
        w-[250px] bg-white border-r border-grey-200 flex-shrink-0 h-screen overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-5 flex flex-col gap-8 sm:gap-10 h-full">
          {/* Logo */}
          <div className="h-8 w-32 sm:w-40 flex items-center justify-between">
            <img 
              alt="Wisemonk Logo" 
              className="h-full w-auto object-contain" 
              src="/images/company-image.png" 
            />
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-grey-100 transition-colors"
            >
              <svg className="w-5 h-5 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* WORKSPACE Section */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="px-2">
                <p className="text-xs font-light text-grey-300 uppercase">WORKSPACE</p>
              </div>
              <div className="flex flex-col gap-1">
                {/* Home - Active */}
                <Link
                  href="/dashboard"
                  onClick={(e) => handleTabClick(e, 'Home')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-lg bg-primary-base/10 text-primary-base hover:bg-primary-base/20 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-bold text-sm sm:text-base text-primary-base">Home</span>
                </Link>

                {/* People */}
                <Link
                  href="/dashboard/people"
                  onClick={(e) => handleTabClick(e, 'People')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-sm sm:text-base text-grey-700">People</span>
                </Link>

                {/* Compliance */}
                <Link
                  href="/dashboard/compliance"
                  onClick={(e) => handleTabClick(e, 'Compliance')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-satoshi font-medium text-sm sm:text-base text-grey-700">Compliance</span>
                </Link>

                {/* Time */}
                <Link
                  href="/dashboard/time"
                  onClick={(e) => handleTabClick(e, 'Time')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <img src="/images/time.svg" alt="Time" className="w-5 h-5" />
                  </div>
                  <span className="font-satoshi font-medium text-sm sm:text-base text-grey-700">Time</span>
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
                  onClick={(e) => handleTabClick(e, 'Payroll')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <img src="/images/payroll.svg" alt="Payroll" className="w-5 h-5" />
                  </div>
                  <span className="font-satoshi font-medium text-sm sm:text-base text-grey-700">Payroll</span>
                </Link>

                {/* Billing */}
                <Link
                  href="/dashboard/billing"
                  onClick={(e) => handleTabClick(e, 'Billing')}
                  className="flex items-center gap-2 h-8 px-2 py-1.5 rounded-md text-grey-700 hover:bg-grey-100 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <img src="/images/billing.svg" alt="Billing" className="w-5 h-5" />
                  </div>
                  <span className="font-satoshi font-medium text-sm sm:text-base text-grey-700">Billing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Header */}
        <header className="bg-[#f1f8ff] h-auto min-h-[80px] sm:h-[100px] flex items-center justify-between px-4 sm:px-5 sm:pr-10 py-4 sm:py-5 sticky top-0 z-30">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/50 transition-colors"
            >
              <svg className="w-6 h-6 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="font-satoshi font-bold text-lg sm:text-xl lg:text-2xl text-grey-700">
                {getGreeting()}, {userName}!
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/50 transition-colors">
              <img src="/images/bell.svg" alt="Notifications" className="w-6 h-6" />
            </button>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-base flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{userInitials}</span>
                </div>
                <span className="hidden sm:inline font-satoshi font-medium text-sm sm:text-base text-grey-700">{userName}</span>
                <div className="hidden sm:block w-4 h-4">
                  <svg className="w-4 h-4 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-grey-200 z-50 overflow-hidden">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-grey-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-base flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">{userInitials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-satoshi font-medium text-base text-grey-700 truncate">{userName}</p>
                        <p className="font-satoshi font-normal text-sm text-grey-500 truncate">{userEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2">
                    {/* Profile */}
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        // Navigate to profile page when implemented
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-grey-100 transition-colors text-left"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-satoshi font-medium text-base text-grey-700">Profile</span>
                    </button>

                    {/* Support */}
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        // Navigate to support page when implemented
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-grey-100 transition-colors text-left"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-satoshi font-medium text-base text-grey-700">Support</span>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        // Navigate to settings page when implemented
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-grey-100 transition-colors text-left"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-satoshi font-medium text-base text-grey-700">Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="border-t border-grey-200 my-2"></div>

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-grey-100 transition-colors text-left"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-satoshi font-medium text-base text-grey-700">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-5 sm:pr-10">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
            {/* Main Card */}
            <div className="bg-white rounded-lg p-4 sm:p-5 flex-1 w-full lg:max-w-[900px]">
              <div className="flex flex-col gap-2 mb-6 sm:mb-10">
                <h2 className="font-satoshi font-bold text-lg sm:text-xl text-grey-700">
                  Start building your team
                </h2>
                <p className="font-satoshi font-medium text-xs sm:text-sm text-grey-500">
                  Get started by finishing these next steps to activate your organisation profile.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Employee Card */}
                <div 
                  ref={employeeCardRef}
                  data-card-type="employee"
                  onMouseEnter={() => setHoveredCard('employee')}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`rounded-lg p-3 sm:p-4 transition-all duration-300 ${
                    hoveredCard === 'employee' 
                      ? 'border-2 border-primary-base shadow-md' 
                      : 'border border-grey-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                    <div className="bg-primary-base/5 rounded-lg p-3 sm:p-4 w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                      <img src="/images/add-emp.svg" alt="Add Employee" className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 w-full">
                      <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                        <h3 className="font-satoshi font-bold text-sm sm:text-base text-grey-700">Employee</h3>
                        <p className="font-satoshi font-medium text-xs leading-normal text-grey-400 sm:max-w-[428px]">
                          Hire a full-time professional in India through Wisemonk.
                        </p>
                      </div>
                      <button className={`font-satoshi font-bold text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${
                        hoveredCard === 'employee'
                          ? 'bg-[#87abff] hover:bg-[#6b8fff] text-white'
                          : 'bg-primary-base/10 hover:bg-primary-base/20 text-primary-base'
                      }`}>
                        Add employee
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contractor Card */}
                <div 
                  ref={contractorCardRef}
                  data-card-type="contractor"
                  onMouseEnter={() => setHoveredCard('contractor')}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`rounded-lg p-3 sm:p-4 transition-all duration-300 ${
                    hoveredCard === 'contractor' 
                      ? 'border-2 border-primary-base shadow-md' 
                      : 'border border-grey-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                    <div className="bg-primary-base/5 rounded-lg px-2 py-2.5 w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                      <img src="/images/contractor.svg" alt="Add Contractor" className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 w-full">
                      <div className="flex flex-col gap-1 sm:gap-2 flex-1">
                        <h3 className="font-satoshi font-bold text-sm sm:text-base text-grey-700">Contractor</h3>
                        <p className="font-satoshi font-medium text-xs leading-normal text-grey-400">
                          Onboard an independent contractor for short-term or project-based work.
                        </p>
                      </div>
                      <button className={`font-satoshi font-bold text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${
                        hoveredCard === 'contractor'
                          ? 'bg-[#87abff] hover:bg-[#6b8fff] text-white'
                          : 'bg-primary-base/10 hover:bg-primary-base/20 text-primary-base'
                      }`}>
                        Add contractor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-lg p-4 sm:p-5 w-full lg:w-[380px] flex flex-col items-center gap-6 sm:gap-8">
              <div className="w-[100px] h-[92px] sm:w-[140px] sm:h-[129px]">
                <img 
                  alt="Help illustration" 
                  className="w-full h-full object-contain" 
                  src="/images/group-logo.svg" 
                />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h3 className="font-satoshi font-bold text-base sm:text-lg text-grey-700">Need help?</h3>
                <p className="font-satoshi font-medium text-xs sm:text-sm text-grey-500">
                  Need a hand setting up your India team? Our onboarding team is just a click away.
                </p>
              </div>
              <button className="w-full h-10 flex items-center justify-center px-4 py-2 rounded-lg hover:bg-primary-base/10 transition-colors">
                <span className="font-satoshi font-bold text-sm sm:text-base text-primary-base">Chat with us</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8">
            <h2 
              className="font-satoshi font-bold mb-4"
              style={{
                color: 'rgb(34, 34, 36)',
                fontSize: '24px',
                fontFamily: 'Satoshi',
                fontWeight: 700,
                textAlign: 'center',
                overflowWrap: 'break-word'
              }}
            >
              {comingSoonTabName}
            </h2>
            <p 
              className="font-satoshi mb-6"
              style={{
                color: 'rgb(98, 99, 104)',
                fontSize: '14px',
                fontFamily: 'Satoshi',
                fontWeight: 400,
                textAlign: 'center',
                lineHeight: 1.5,
                overflowWrap: 'break-word'
              }}
            >
              This feature is coming soon.
            </p>
            <button
              onClick={handleGotIt}
              className="font-satoshi text-white"
              style={{
                width: '100%',
                height: '40px',
                padding: '10px 20px',
                background: 'rgb(38, 132, 255)',
                borderRadius: '8px',
                border: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(38, 132, 255, 0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgb(38, 132, 255)'
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

