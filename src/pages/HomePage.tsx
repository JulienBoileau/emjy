import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HomeHeroContent } from '../lib/models';
import { subscribeHomepageContent } from '../lib/siteContent';
import './HomePage.css';

const fallback: HomeHeroContent = {
  heroImageUrl: 'assets/affiche_octobre.jpeg',
  heroImageAlt: 'Affiche spectacle',
  ticketUrl: 'https://www.chateau-desdauphins.fr/',
  badgeText: 'En ce moment'
};

export function HomePage() {
  const [homepage, setHomepage] = useState<HomeHeroContent>(fallback);

  useEffect(() => {
    const unsubscribe = subscribeHomepageContent(
      (next) => setHomepage(next),
      () => setHomepage(fallback)
    );
    return unsubscribe;
  }, []);

  return (
    <section className="hero">
      <div className="hero-text reveal active">
        <h1>CAPTATION</h1>
        <h2>& MONTAGE <span id="video">VIDEO</span></h2>
        <p>Nous sublimons vos spectacles a travers une realisation video soignee et un accompagnement personnalise.</p>
        <div className="hero-actions">
          <Link to="/services" className="btn services-btn">Nos services</Link>
            <a href="mailto:contact@emjyproduction.com" className="btn contact-btn">
            <i className="fa-solid fa-paper-plane" /> Contactez-nous
          </a>
        </div>
      </div>

      <div className="hero-image reveal active">
        <div className="image-container">
          <img src={homepage.heroImageUrl} alt={homepage.heroImageAlt} />
          <div className="overlay">
            <a href={homepage.ticketUrl || fallback.ticketUrl} className="ticket-link" target="_blank" rel="noreferrer">
              <i className="fa-solid fa-eye" /> Voir la billetterie
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
