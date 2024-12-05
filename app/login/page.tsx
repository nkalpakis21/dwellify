// Import the required functions from next-auth
// import { getSession, useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import LoginForm from './login-form'

export default async function LoginPage() {
  // Get the session using getSession
  // const session = await useSession()

  // If the user is already logged in, redirect to the dashboard
  // if (session) {
  //   redirect('/dashboard')
  // }

  // Otherwise, show the login form
  return <LoginForm />
}
