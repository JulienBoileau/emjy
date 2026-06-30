import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/presentation', label: 'PRÉSENTATION', icon: 'fa-regular fa-user' },
  { to: '/services', label: 'NOS SERVICES', icon: 'fa-solid fa-clapperboard' },
  { to: '/agenda', label: 'AGENDA', icon: 'fa-regular fa-calendar-days' },
  { to: '/galerie', label: 'GALERIE', icon: 'fa-regular fa-images' },
  { to: '/contact', label: 'CONTACT', icon: 'fa-regular fa-envelope' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="logo">
        <NavLink to="/accueil" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt="EMJY Production Logo" />
        </NavLink>
      </div>

      <button className="burger" type="button" aria-label="Ouvrir le menu" onClick={() => setOpen((value) => !value)}>
        <i className="fa-solid fa-bars" />
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} onClick={() => setOpen(false)}>
              <i className={`${link.icon} nav-link-icon`} aria-hidden="true" />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
        <li className="newsletter-item">
          <NavLink
            to="/newsletter"
            className="newsletter-btn"
            onClick={() => setOpen(false)}
          >
            <i className="fa-regular fa-paper-plane nav-link-icon" aria-hidden="true" />
            <span>NEWSLETTER</span>
          </NavLink>
        </li>
        <li className="social-icons">
          <a href="https://www.instagram.com/emjy_production/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="https://www.facebook.com/people/EMJY-Production/61576151466340/?_rdr" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
