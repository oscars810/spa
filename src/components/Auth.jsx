import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Revisa tu correo para iniciar sesión!')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center items-center justify-center w-full h-full">
      <div className="col-6 form-widget bg-indigo-600 p-10 w-1/3 rounded-lg shadow-2xl">
        <h1 className="text-white mb-10 text-2xl">Ingresa a Servicios Carvuk</h1>
        <p className="text-white text-base">Ingresa con un link magico a tu correo!</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="text-black rounded-sm p-2 m-4"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className="rounded-full bg-white text-black py-3 px-10 text-base mt-4" disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}