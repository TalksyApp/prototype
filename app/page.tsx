"use client"

import { useState, useEffect } from "react"
import { storage, type User } from "@/lib/storage"
import AuthPage from "@/components/auth-page"
import MainApp from "@/components/main-app"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = storage.getCurrentUser()
    setCurrentUser(user)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">TALKSY</h1>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <AuthPage onUserCreated={setCurrentUser} />
  }

  return <MainApp currentUser={currentUser} onUserUpdate={setCurrentUser} />
}
