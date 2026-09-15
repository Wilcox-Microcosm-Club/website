import { ArrowRight, CalendarDays, MapPin, Recycle, Sprout, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementCard from '../components/AnnouncementCard'
import { fallbackAnnouncements, fallbackOfficers, fallbackSettings } from '../lib/content'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Announcement, Officer, SiteSettings } from '../lib/types'

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings)
  const [announcements, setAnnouncements] = useState<Announcement[]>(fallbackAnnouncements)
  const [officers, setOfficers] = useState<Officer[]>(fallbackOfficers)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('announcements').select('*').eq('status', 'published').order('published_at', { ascending: false }).limit(3),
      supabase.from('officers').select('*').eq('is_active', true).order('display_order'),
    ]).then(([site, news, people]) => {
      if (site.data) setSettings(site.data)
      if (news.data?.length) setAnnouncements(news.data)
      if (people.data?.length) setOfficers(people.data)
    })
  }, [])

  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow"><Sprout size={16} /> Grow something small</p>
          <h1>A tiny world,<br /><em>built together.</em></h1>
          <p className="hero-intro">{settings.about}</p>
          <div className="hero-actions">
            <a className="button primary" href="#meetings">Join a meeting</a>
            <Link className="text-link" to="/announcements">See club updates <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="terrarium-window" aria-label="Stylized terrarium">
          <div className="glass-glow" />
          <div className="plant plant-one"><span /><span /><span /></div>
          <div className="plant plant-two"><span /><span /></div>
          <div className="soil" />
        </div>
      </section>

      <section className="meeting-strip" id="meetings">
        <div className="page-width meeting-grid">
          <div><CalendarDays /><span><small>When we meet</small>{settings.meeting_schedule}</span></div>
          <div><MapPin /><span><small>Where to find us</small>{settings.meeting_location}</span></div>
          <div><Users /><span><small>Who can join</small>All Wilcox students</span></div>
        </div>
      </section>

      <section className="section page-width">
        <div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Learn by making.</h2></div></div>
        <div className="feature-grid">
          <article><span className="icon-tile"><Sprout /></span><h3>Build terrariums</h3><p>Create miniature environments while learning how plants, soil, water, and light work together.</p></article>
          <article><span className="icon-tile"><Users /></span><h3>Share skills</h3><p>Learn from other students, exchange ideas, and help newcomers finish their first project.</p></article>
          <article><span className="icon-tile"><Recycle /></span><h3>Care responsibly</h3><p>Practice long-term plant care and find creative ways to reuse containers and materials.</p></article>
        </div>
      </section>

      <section className="section page-width">
        <div className="section-heading"><div><p className="eyebrow">Latest news</p><h2>From the club.</h2></div><Link className="text-link" to="/announcements">All announcements <ArrowRight size={17} /></Link></div>
        <div className="announcement-grid">{announcements.map(item => <AnnouncementCard key={item.id} announcement={item} />)}</div>
      </section>

      <section className="section page-width">
        <div className="section-heading"><div><p className="eyebrow">Meet the team</p><h2>Student-led, together.</h2></div></div>
        <div className="officer-grid">{officers.map(officer => <article className="officer" key={officer.id}><div className="officer-photo">{officer.image_url ? <img src={officer.image_url} alt={officer.name} /> : <span>{officer.name.charAt(0)}</span>}</div><h3>{officer.name}</h3><p>{officer.position}</p></article>)}</div>
      </section>
    </>
  )
}
