import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fallbackAnnouncements } from '../lib/content'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Announcement } from '../lib/types'

export default function AnnouncementPage() {
  const { id } = useParams()
  const [item, setItem] = useState<Announcement | null>(fallbackAnnouncements.find(a => a.id === id) ?? null)
  useEffect(() => {
    if (!isSupabaseConfigured || !id) return
    supabase.from('announcements').select('*').eq('id', id).eq('status', 'published').maybeSingle().then(({ data }) => setItem(data))
  }, [id])
  if (!item) return <div className="page-state">Announcement not found.</div>
  return <article className="article-page page-width"><Link className="text-link" to="/announcements"><ArrowLeft size={17} /> Back to announcements</Link>{item.image_url && <img className="article-image" src={item.image_url} alt="" />}<time>{item.published_at && new Date(item.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time><h1>{item.title}</h1><div className="article-body">{item.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}</div></article>
}
