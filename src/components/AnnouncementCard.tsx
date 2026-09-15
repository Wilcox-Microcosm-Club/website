import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Announcement } from '../lib/types'

export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const date = announcement.published_at ? new Date(announcement.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'
  return (
    <article className="announcement-card">
      {announcement.image_url && <img src={announcement.image_url} alt="" />}
      <div className="announcement-card-body">
        <time>{date}</time>
        <h3>{announcement.title}</h3>
        <p>{announcement.body.slice(0, 155)}{announcement.body.length > 155 ? '…' : ''}</p>
        <Link to={`/announcements/${announcement.id}`}>Read announcement <ArrowRight size={16} /></Link>
      </div>
    </article>
  )
}
