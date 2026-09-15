import { Menu, Sprout, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" onClick={close}>
          <span className="brand-mark"><Sprout size={22} /></span>
          <span>Wilcox Terrarium Club</span>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <NavLink to="/" onClick={close}>About</NavLink>
          <NavLink to="/announcements" onClick={close}>Announcements</NavLink>
          <NavLink to="/donate" onClick={close}>Donate</NavLink>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div>
          <strong>Wilcox Terrarium Club</strong>
          <p>Student-led at Adrian Wilcox High School.</p>
        </div>
        <div className="footer-links">
          <Link to="/login">Officer login</Link>
          <span>Website developed by Logan</span>
        </div>
      </footer>
    </div>
  )
}
