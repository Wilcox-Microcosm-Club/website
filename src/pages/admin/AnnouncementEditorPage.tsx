import { ArrowLeft, Save, Send, Trash2, Upload } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AnnouncementEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => { if (id) supabase.from('announcements').select('*').eq('id', id).single().then(({ data }) => { if (data) { setTitle(data.title); setBody(data.body); setImageUrl(data.image_url) } }) }, [id])
  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setBusy(true)
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`
    const { error } = await supabase.storage.from('announcement-images').upload(path, file)
    if (error) setMessage(error.message)
    else setImageUrl(supabase.storage.from('announcement-images').getPublicUrl(path).data.publicUrl)
    setBusy(false)
  }
  async function save(status: 'draft' | 'published') {
    if (!title.trim() || !body.trim()) return setMessage('Add both a title and body.')
    setBusy(true)
    const { data: auth } = await supabase.auth.getUser()
    const record = { title: title.trim(), body: body.trim(), image_url: imageUrl, status, author_id: auth.user!.id, published_at: status === 'published' ? new Date().toISOString() : null }
    const result = id ? await supabase.from('announcements').update(record).eq('id', id) : await supabase.from('announcements').insert(record)
    setBusy(false)
    if (result.error) setMessage(result.error.message)
    else navigate('/admin')
  }
  async function remove() { if (id && window.confirm('Delete this announcement permanently?')) { await supabase.from('announcements').delete().eq('id', id); navigate('/admin') } }
  return <section className="editor-page page-width"><Link className="text-link" to="/admin"><ArrowLeft size={17} /> Dashboard</Link><header><p className="eyebrow">{id ? 'Edit announcement' : 'New announcement'}</p><h1>{id ? title || 'Untitled' : 'Share an update'}</h1></header><form onSubmit={(e: FormEvent) => e.preventDefault()}><label>Title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Meeting this Thursday" maxLength={120} /></label><label>Body<textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write the announcement…" rows={12} /></label><label className="upload-field"><span>Optional image</span><span className="button secondary"><Upload size={18} /> {busy ? 'Uploading…' : 'Choose image'}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={busy} /></label>{imageUrl && <img className="editor-preview" src={imageUrl} alt="Announcement preview" />}{message && <p className="form-message">{message}</p>}<div className="editor-actions"><button className="button secondary" type="button" disabled={busy} onClick={() => save('draft')}><Save size={18} /> Save draft</button><button className="button primary" type="button" disabled={busy} onClick={() => save('published')}><Send size={18} /> Publish</button>{id && <button className="button danger" type="button" onClick={remove}><Trash2 size={18} /> Delete</button>}</div></form></section>
}
