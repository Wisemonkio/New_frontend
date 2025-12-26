'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/lib/api'

interface Task {
  id: string
  name: string
  completed: boolean
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userInitials, setUserInitials] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('Home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Task list data
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Personal details', completed: true },
    { id: '2', name: 'Employee agreement', completed: true },
    { id: '3', name: 'Document collection', completed: true },
    { id: '4', name: 'Bank & EPF details', completed: false },
    { id: '5', name: 'Previous employer tax details', completed: false },
  ])

  // Calculate progress percentage
  const completedTasks = tasks.filter(task => task.completed).length
  const progressPercentage = (completedTasks / tasks.length) * 100

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

  const handleSignOut = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        await logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
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
  }

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Home') {
      setActiveTab('Home')
    } else {
      // For other tabs, you can add navigation logic here
      setActiveTab(tabName)
    }
    // Close sidebar on mobile after navigation
    setIsSidebarOpen(false)
  }

  const handleContinue = () => {
    // Navigate to the first incomplete task or onboarding flow
    const incompleteTask = tasks.find(task => !task.completed)
    if (incompleteTask) {
      // You can add navigation logic here based on task type
      console.log('Navigate to:', incompleteTask.name)
    }
  }

  return (
    <div className="bg-[#f1f8ff] relative w-full h-screen flex overflow-hidden">
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
        bg-white border-r border-[#ddd] flex flex-col h-full items-start px-3 sm:px-4 py-6 sm:py-[30px] 
        w-[240px] sm:w-[256px] shrink-0 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full items-center relative shrink-0 w-full">
          <div className="flex flex-col gap-8 sm:gap-10 items-center relative shrink-0 w-full">
            {/* Logo with Close Button */}
            <div className="h-8 relative shrink-0 w-32 sm:w-40 flex items-center justify-between w-full">
              <img 
                alt="Wisemonk logo" 
                className="h-full w-auto object-contain pointer-events-none" 
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
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col items-start p-2 relative shrink-0 w-full">
                {/* Workspace Section Header */}
                <div className="flex flex-col h-9 items-start pb-1 pt-0 px-0 relative shrink-0 w-full">
                  <div className="flex h-8 items-center px-2 py-0 relative rounded-md shrink-0 w-full">
                    <p className="flex-1 font-['Open_Sans'] font-semibold text-xs text-[rgba(107,114,128,0.7)] tracking-[0.6px] uppercase leading-4">
                      WORKSPACE
                    </p>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
                  {/* Home - Active */}
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <button
                      onClick={() => handleTabClick('Home')}
                      className={`content-stretch cursor-pointer flex gap-2 h-8 items-center overflow-clip px-2 py-1.5 relative rounded-lg shrink-0 w-full ${
                        activeTab === 'Home'
                          ? 'bg-primary-base/10'
                          : 'hover:bg-grey-100'
                      }`}
                    >
                      <div className="relative shrink-0 size-5">
                        <img 
                          alt="Home icon" 
                          className="block max-w-none size-full" 
                          src="/images/home-icon-employee.svg" 
                        />
                      </div>
                      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
                        <p className={`font-satoshi font-bold text-base leading-normal ${
                          activeTab === 'Home' ? 'text-primary-base' : 'text-grey-700'
                        }`}>
                          Home
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Time */}
                  <div className="flex flex-col items-start relative shrink-0 w-full">
                    <button
                      onClick={() => handleTabClick('Time')}
                      className={`content-stretch cursor-pointer flex gap-2 h-8 items-center overflow-clip px-2 py-1.5 relative rounded-md shrink-0 w-full ${
                        activeTab === 'Time'
                          ? 'bg-primary-base/10'
                          : 'hover:bg-grey-100'
                      }`}
                    >
                      <div className="relative shrink-0 size-5">
                        <img 
                          alt="Time icon" 
                          className="block max-w-none size-full" 
                          src="/images/time-icon-employee.svg" 
                        />
                      </div>
                      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
                        <p className="font-satoshi font-medium text-base text-grey-700 leading-5">
                          Time
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-auto">
        {/* Header */}
        <div className="bg-[#f1f8ff] flex h-[70px] sm:h-[80px] md:h-[100px] items-center justify-between pl-3 sm:pl-4 md:pl-5 pr-3 sm:pr-6 md:pr-10 py-3 sm:py-4 md:py-5 sticky top-0 z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-grey-200 transition-colors"
            >
              <svg className="w-6 h-6 text-grey-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex flex-col items-start relative shrink-0">
              <h1 className="font-satoshi font-bold text-lg sm:text-xl md:text-[23px] text-grey-700 leading-tight">
                Welcome back!
              </h1>
            </div>
          </div>
          <div className="content-stretch flex items-center relative shrink-0">
            <div className="content-stretch flex gap-2 sm:gap-3 md:gap-4 items-center relative shrink-0">
              {/* Bell Icon */}
              <div className="content-stretch flex items-center relative shrink-0">
                <button className="content-stretch flex items-center justify-center relative rounded-md shrink-0 size-7 sm:size-8 hover:bg-grey-200 transition-colors">
                  <div className="relative shrink-0 size-5 sm:size-6">
                    <img 
                      alt="Notifications" 
                      className="block max-w-none size-full" 
                      src="/images/bell-icon-employee.svg" 
                    />
                  </div>
                </button>
              </div>

              {/* User Profile */}
              <div className="content-stretch flex gap-1.5 sm:gap-2 items-center relative shrink-0" ref={userMenuRef}>
                <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-full shrink-0 size-7 sm:size-8">
                  <div className="bg-primary-base content-stretch flex flex-1 h-full items-center justify-center min-h-px min-w-px relative rounded-full shrink-0">
                    <p className="flex-1 font-satoshi font-semibold text-[10px] sm:text-[11px] text-white text-center leading-4 sm:leading-5">
                      {userInitials || 'U'}
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 hidden sm:flex">
                  <p className="font-satoshi font-semibold text-sm sm:text-base text-grey-700 whitespace-nowrap leading-4">
                    {userName || 'User'}
                  </p>
                </div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative shrink-0 size-3.5 sm:size-4 cursor-pointer"
                >
                  <img 
                    alt="Dropdown" 
                    className="block max-w-none size-full" 
                    src="/images/dropdown.svg" 
                  />
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-60 bg-white rounded-lg shadow-lg py-2 z-40 top-full">
                    <div className="px-3 sm:px-4 py-2 border-b border-grey-200">
                      <p className="font-satoshi font-semibold text-xs sm:text-sm text-grey-700 truncate">{userName || 'User'}</p>
                      <p className="font-satoshi font-medium text-xs text-grey-500 mt-0.5 truncate">{userEmail}</p>
                    </div>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-grey-700 hover:bg-grey-100 w-full text-left"
                    >
                      <span className="font-satoshi font-medium text-xs sm:text-sm">Profile</span>
                    </button>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-grey-700 hover:bg-grey-100 w-full text-left"
                    >
                      <span className="font-satoshi font-medium text-xs sm:text-sm">Support</span>
                    </button>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-grey-700 hover:bg-grey-100 w-full text-left"
                    >
                      <span className="font-satoshi font-medium text-xs sm:text-sm">Settings</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-grey-700 hover:bg-grey-100 w-full text-left"
                    >
                      <span className="font-satoshi font-medium text-xs sm:text-sm">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start p-3 sm:p-4 md:p-5">
          {/* Complete Setup Card */}
          <div className="bg-white flex flex-col gap-4 sm:gap-5 md:gap-6 items-start p-4 sm:p-5 relative rounded-lg shrink-0 w-full lg:flex-1 lg:max-w-[900px]">
            {/* Progress Bar */}
            <div className="bg-white flex flex-col items-start overflow-clip px-2 py-1 relative rounded-lg shrink-0 w-full">
              <div className="border-0 border-grey-100 border-solid flex gap-2 items-center justify-end pb-1 pt-0 px-0 relative shrink-0 w-full">
                <div className="flex flex-1 flex-col items-end justify-center min-h-px min-w-px relative shrink-0">
                  <div className="bg-grey-100 h-1.5 relative rounded-full shrink-0 w-full">
                    <div 
                      className="absolute bg-primary-base inset-y-0 left-0 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Setup Section */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="bg-white border border-grey-100 border-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 relative rounded-lg shrink-0 w-full">
                  <div className="flex flex-col items-start relative shrink-0 flex-1">
                    <div className="flex flex-col gap-1.5 sm:gap-2 items-start leading-normal not-italic relative shrink-0 w-full">
                      <p className="font-satoshi font-bold relative shrink-0 text-sm sm:text-base text-grey-700">
                        Complete you setup
                      </p>
                      <p className="font-satoshi font-medium relative shrink-0 text-xs text-grey-400">
                        Due by Dec 1, 2025
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="bg-primary-base flex h-8 sm:h-9 items-center px-3 sm:px-4 py-2 relative rounded-lg shrink-0 w-full sm:w-auto hover:opacity-90 transition-opacity"
                  >
                    <div className="flex gap-1 h-full items-center relative shrink-0">
                      <p className="font-satoshi font-bold text-sm sm:text-base text-white text-center whitespace-nowrap leading-normal">
                        Continue
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full">
              {/* Completed Tasks Group */}
              <div className="flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full">
                {tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#fbfbfb] flex items-center p-2 sm:p-2.5 relative rounded-lg shrink-0 w-full"
                  >
                    <div className="flex flex-1 flex-col items-start min-h-px min-w-px relative shrink-0">
                      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0 w-full">
                        <div className="relative shrink-0 size-5 sm:size-6">
                          <img 
                            alt="Check circle" 
                            className="block max-w-none size-full" 
                            src="/images/check-circle-icon.svg" 
                          />
                        </div>
                        <p className="flex-1 font-satoshi font-medium leading-normal min-h-px min-w-px not-italic relative shrink-0 text-xs sm:text-sm text-grey-600 whitespace-pre-wrap">
                          {task.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Incomplete Tasks Group */}
              <div className="flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full">
                {tasks.slice(3).map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#fbfbfb] flex items-center p-2 sm:p-2.5 relative rounded-lg shrink-0 w-full"
                  >
                    <div className="flex flex-1 flex-col items-start min-h-px min-w-px relative shrink-0">
                      <div className="flex gap-2 sm:gap-3 items-center relative shrink-0 w-full">
                        <div className="relative shrink-0 size-5 sm:size-6">
                          <img 
                            alt="Circle outline" 
                            className="block max-w-none size-full" 
                            src="/images/circle-outline.svg" 
                          />
                        </div>
                        <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-600">
                          {task.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="flex flex-col items-start justify-center relative shrink-0 w-full lg:w-[380px]">
            <div className="bg-white flex flex-col gap-6 sm:gap-8 items-start p-4 sm:p-5 relative rounded-lg shrink-0 w-full">
              <div className="flex flex-col gap-3 sm:gap-4 items-start leading-normal not-italic relative shrink-0 w-full">
                <p className="font-satoshi font-bold relative shrink-0 text-base sm:text-lg text-grey-700">
                  Need help?
                </p>
                <p className="font-satoshi font-medium relative shrink-0 text-xs sm:text-sm text-grey-500 whitespace-pre-wrap">
                  Our support team is here to assist you with any questions during your preboarding and onboarding.
                </p>
              </div>
              <div className="flex gap-2 items-start relative shrink-0">
                <div className="relative shrink-0 size-5 sm:size-6">
                  <img 
                    alt="Email icon" 
                    className="block max-w-none size-full" 
                    src="/images/email-icon.svg" 
                  />
                </div>
                <div className="flex flex-col font-satoshi font-medium justify-center leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-700">
                  <p className="leading-normal break-all sm:break-normal">support@wisemonk.co</p>
                </div>
              </div>
              <button className="flex h-9 sm:h-10 items-center justify-center px-4 py-2 relative rounded-lg shrink-0 w-full hover:bg-primary-base/10 transition-colors">
                <div className="flex gap-1 h-full items-center relative shrink-0">
                  <p className="font-satoshi font-bold text-sm sm:text-base text-primary-base text-center whitespace-nowrap leading-normal">
                    Chat with us
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

