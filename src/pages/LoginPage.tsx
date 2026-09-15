import { LockKeyhole } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!isSupabaseConfigured) return setMessage('Connect Supabase before officer login can be used.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else navigate('/admin')
  }
  return <section className="login-page page-width"><form className="login-card" onSubmit={submit}><span className="login-icon"><LockKeyhole /></span><p className="eyebrow">Officer access</p><h1>Sign in</h1><p>Use the account provided by the club’s Web Manager.</p><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{message && <p className="form-message">{message}</p>}<button className="button primary" type="submit">Sign in</button></form></section>
}
