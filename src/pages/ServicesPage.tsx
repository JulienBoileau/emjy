import { useReveal } from '../lib/useReveal';
import './ServicesPage.css';

const services = [
  { img: '/assets/captation.png', title: 'CAPTATION VIDEO', text: 'Un service clé en main pour capturer l essence de votre performance.' },
  { img: '/assets/montage.png', title: 'MONTAGE VIDEO', text: 'Nous proposons différents types de contenus vidéo suite à la captation.' },
  { img: '/assets/accompagnement.png', title: 'ACCOMPAGNEMENT SUR LA DURÉE', text: 'Nous suivons l artiste sur sa tournée avec une qualité constante.' },
  { img: '/assets/comedyclub.png', title: 'ORGANISATION DE COMEDY CLUB', text: 'Nous transformons votre lieu en vraie scène de spectacle.' }
];

export function ServicesPage() {
  useReveal();

  return (
    <section className="services-page">
      <header className="services-hero reveal">
        <h1 className="services-page-title">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M7 5.75a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zm10 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM7 14.45a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zm10 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM9 8h6m-6 8h6M7.8 9.8l2.8 2.2m5.8-2.2L13.6 12m-2.8 0L7.8 14.2m5.6 0 2.8-2.2" />
          </svg>
          <span>Quatre expertises pour structurer, filmer et valoriser vos spectacles.</span>
        </h1>
      </header>

      <div className="service-list">
        {services.map((service) => (
          <article key={service.title} className="service reveal">
            <div className="service-media">
              <img src={service.img} alt={service.title} />
            </div>
            <div className="service-copy">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        ))}
      </div>

      <h2 className="services-heading reveal">NOS TARIFS</h2>
      <div className="tarif-list">
        <article className="tarif reveal">
          <h3><i className="fa-solid fa-video" aria-hidden="true" /> Captation vidéo <span>150 EUR HT</span></h3>
          <p>Captation intégrale artiste et humoriste.</p>
          <a href="mailto:contact@emjyproduction.com" className="overlay-btn">Envoyer une demande</a>
        </article>
        <article className="tarif reveal">
          <h3><i className="fa-solid fa-scissors" aria-hidden="true" /> Montage vidéo <span>70 EUR HT</span></h3>
          <p>Édition vidéo et formats réseaux sociaux.</p>
          <a href="mailto:contact@emjyproduction.com" className="overlay-btn">Envoyer une demande</a>
        </article>
        <article className="tarif reveal">
          <h3><i className="fa-solid fa-computer" aria-hidden="true" /> Captation + montage vidéo <span>180 EUR HT</span></h3>
          <p>Formule complète adaptée à vos besoins.</p>
          <a href="mailto:contact@emjyproduction.com" className="overlay-btn">Envoyer une demande</a>
        </article>
      </div>
    </section>
  );
}
