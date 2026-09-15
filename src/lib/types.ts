export type Announcement = {
  id: string
  title: string
  body: string
  image_url: string | null
  status: 'draft' | 'published'
  author_id: string
  published_at: string | null
  created_at: string
  updated_at: string
}

export type Officer = {
  id: string
  name: string
  position: string
  bio: string | null
  image_url: string | null
  display_order: number
}

export type SiteSettings = {
  club_name: string
  about: string
  meeting_schedule: string
  meeting_location: string
  donation_copy: string
  donation_url: string
  instagram_url: string
  contact_email: string
}
