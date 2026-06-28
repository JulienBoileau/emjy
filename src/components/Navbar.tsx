import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/presentation', label: 'PRÉSENTATION' },
  { to: '/services', label: 'NOS SERVICES' },
  { to: '/agenda', label: 'AGENDA' },
  { to: '/galerie', label: 'GALERIE' },
  { to: '/contact', label: 'CONTACT' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

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
              {link.label}
            </NavLink>
          </li>
        ))}
        <li className="newsletter-item">
          <NavLink
            to="/newsletter"
            className="newsletter-btn"
            onClick={() => setOpen(false)}
          >
            NEWSLETTER
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
