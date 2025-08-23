'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  bio?: string
  profilePicture?: string
  lastActive: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  continueAsGuest: () => void
  isGuest: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user')
      const guestMode = localStorage.getItem('guestMode')
      
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        // Ensure user data is valid
        if (userData && userData.id && userData.email && userData.name) {
          setUser(userData)
        } else {
          // Invalid user data, clear it
          localStorage.removeItem('user')
        }
      } else if (guestMode) {
        setIsGuest(true)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('guestMode')
    } finally {
      setIsInitialized(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        const userWithActivity = {
          ...userWithoutPassword,
          lastActive: new Date().toISOString()
        }
        setUser(userWithActivity)
        localStorage.setItem('user', JSON.stringify(userWithActivity))
        localStorage.removeItem('guestMode')
        setIsGuest(false)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      if (!email || !password || !name) {
        return false
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (users.find((u: any) => u.email === email)) {
        return false // User already exists
      }

      const newUser = {
        id: Date.now().toString(),
        email: email.trim(),
        password: password,
        name: name.trim(),
        bio: '',
        profilePicture: '',
        lastActive: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      localStorage.removeItem('guestMode')
      setIsGuest(false)
      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsGuest(false)
    localStorage.removeItem('user')
    localStorage.removeItem('guestMode')
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return
    
    try {
      const updatedUser = { ...user, ...updates, lastActive: new Date().toISOString() }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates, lastActive: updatedUser.lastActive }
        localStorage.setItem('users', JSON.stringify(users))
      }
    } catch (error) {
      console.error('Update profile error:', error)
    }
  }

  const continueAsGuest = () => {
    setIsGuest(true)
    localStorage.setItem('guestMode', 'true')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      continueAsGuest,
      isGuest,
      isInitialized
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}