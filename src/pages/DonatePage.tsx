import { ExternalLink, Heart, PackageOpen, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fallbackSettings } from '../lib/content'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { SiteSettings } from '../lib/types'

export default function DonatePage() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings)
  useEffect(() => { if (isSupabaseConfigured) supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => data && setSettings(data)) }, [])
  return <section className="inner-page page-width donate-layout"><div><p className="eyebrow"><Heart size={16} /> Support the club</p><h1>Help our tiny ecosystems grow.</h1><p className="large-copy">{settings.donation_copy}</p>{settings.donation_url ? <a className="button primary" href={settings.donation_url} target="_blank" rel="noreferrer">Donate through our school <ExternalLink size={17} /></a> : <span className="button disabled">Donation link coming soon</span>}</div><aside className="donation-card"><div><PackageOpen /><span><strong>What donations fund</strong><small>Plants, containers, soil, tools, and activity supplies</small></span></div><div><ShieldCheck /><span><strong>School-approved giving</strong><small>Payments are handled outside this website through the approved school method.</small></span></div></aside></section>
}
