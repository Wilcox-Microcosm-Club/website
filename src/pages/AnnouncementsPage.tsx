import { useEffect, useState } from 'react'
import AnnouncementCard from '../components/AnnouncementCard'
import { fallbackAnnouncements } from '../lib/content'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Announcement } from '../lib/types'

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>(fallbackAnnouncements)
  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.from('announcements').select('*').eq('status', 'published').order('published_at', { ascending: false }).then(({ data }) => data && setItems(data))
  }, [])
  return <section className="inner-page page-width"><header className="page-heading"><p className="eyebrow">Club updates</p><h1>Announcements</h1><p>Meeting reminders, upcoming projects, fundraisers, and news from the Terrarium Club.</p></header><div className="announcement-grid">{items.map(item => <AnnouncementCard key={item.id} announcement={item} />)}</div></section>
}
