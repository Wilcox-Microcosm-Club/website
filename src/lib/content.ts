import type { Announcement, Officer, SiteSettings } from './types'

export const fallbackSettings: SiteSettings = {
  club_name: 'Wilcox Terrarium Club',
  about: 'We are a student-led club for anyone interested in plants, terrariums, and the tiny ecosystems we can build together. No experience is required—just curiosity.',
  meeting_schedule: 'Meeting schedule coming soon',
  meeting_location: 'Room to be announced',
  donation_copy: 'Donations help us purchase plants, containers, soil, tools, and supplies for club activities. Our school-approved donation link will be added here soon.',
  donation_url: '',
  instagram_url: '',
  contact_email: 'Club email coming soon',
}

export const fallbackAnnouncements: Announcement[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Terrarium Club',
    body: 'Our announcements will appear here once officer accounts are connected. Check back for meeting dates, projects, fundraisers, and club news.',
    image_url: null,
    status: 'published',
    author_id: 'starter',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const fallbackOfficers: Officer[] = [
  { id: '1', name: 'Name coming soon', position: 'President', bio: null, image_url: null, display_order: 1 },
  { id: '2', name: 'Name coming soon', position: 'Vice President', bio: null, image_url: null, display_order: 2 },
  { id: '3', name: 'Logan', position: 'Treasurer / Web Manager', bio: null, image_url: null, display_order: 3 },
  { id: '4', name: 'Name coming soon', position: 'Publicist', bio: null, image_url: null, display_order: 4 },
]
