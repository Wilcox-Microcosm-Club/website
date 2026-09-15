import { FilePlus2, LogOut, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Announcement } from '../../lib/types'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Announcement[]>([])
  useEffect(() => { supabase.from('announcements').select('*').order('updated_at', { ascending: false }).then(({ data }) => data && setItems(data)) }, [])
  async function signOut() { await supabase.auth.signOut(); navigate('/') }
  return <section className="admin-page page-width"><header className="admin-header"><div><p className="eyebrow">Officer dashboard</p><h1>Announcements</h1></div><div className="admin-actions"><Link className="button primary" to="/admin/announcements/new"><FilePlus2 size={18} /> New announcement</Link><button className="button secondary" onClick={signOut}><LogOut size={18} /> Sign out</button></div></header><div className="admin-list">{items.length === 0 ? <div className="empty-state"><h2>No announcements yet</h2><p>Create the club’s first announcement when you’re ready.</p></div> : items.map(item => <article key={item.id}><div><span className={`status ${item.status}`}>{item.status}</span><h2>{item.title}</h2><p>Updated {new Date(item.updated_at).toLocaleDateString()}</p></div><Link className="icon-button" to={`/admin/announcements/${item.id}`} aria-label={`Edit ${item.title}`}><Pencil /></Link></article>)}</div></section>
}
