import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'
import Auth from './components/Auth'
import Services from './components/Services'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="h-full flex flex-col overflow-y-scroll bg-indigo-50">
      {!session ? <Auth /> : <Services key={session.user.id} session={session} />}
    </div>
  )
}


export default App
