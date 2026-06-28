import { BordeauxIcon } from '../components/cities/BordeauxIcon';
import { LyonIcon } from '../components/cities/LyonIcon';
import { MarseilleIcon } from '../components/cities/MarseilleIcon';
import { ParisIcon } from '../components/cities/ParisIcon';
import { useReveal } from '../lib/useReveal';
import './PresentationPage.css';

export function PresentationPage() {
  useReveal();

  return (
    <section className="team-presentation">
      <h1 className="reveal">
        <span>Emjy Production,</span>
        <span className="title-break">quatre bordelais au service de l'humour</span>
      </h1>
      <div className="tags reveal"><span>Humour</span><span>Bordeaux</span><span>Paris</span><span>Captation</span></div>

      <div className="team-image reveal">
        <div className="half-image left" />
        <div className="half-image right" />
      </div>

      <div className="team-content reveal">
        <article className="story-card story-card-primary">
          <div className="story-head">
            <div className="story-icon"><i className="fa-solid fa-people-group" /></div>
            <h3>Une aventure humaine</h3>
          </div>
          <p className="team-lead">
            <strong>Emjy Production</strong>, c'est l'histoire de quatre amis devenus associés, unis par une <span className="highlight-pill">passion commune</span> et l'envie de créer un <span className="highlight-pill">projet ambitieux</span>.
          </p>
          <p>
            Issus de parcours aussi riches que variés - hôtellerie-restauration, banque, audiovisuel ou entrepreneuriat - ils ont choisi de mettre en commun leurs compétences pour donner naissance à une <span className="highlight-text">aventure humaine et artistique unique</span>.
          </p>
        </article>

        <div className="story-grid">
          <article className="story-card">
            <div className="story-head">
              <div className="story-icon"><i className="fa-solid fa-binoculars" /></div>
              <h3>Une vision claire</h3>
            </div>
            <p>
              De cette synergie est née <strong>Emjy Production</strong>, une société spécialisée dans l'organisation d'événements humoristiques.
            </p>
            <p>
              <strong>Son objectif :</strong> dynamiser la scène du stand-up dans le Sud-Ouest et l'élever à un nouveau niveau de visibilité.
            </p>
          </article>

          <article className="story-card">
            <div className="story-head">
              <div className="story-icon"><i className="fa-solid fa-bullseye" /></div>
              <h3>Une double expertise</h3>
            </div>
            <p>
              L'activité d'Emjy Production ne s'arrête pas là. En parallèle à l'organisation de spectacles, l'équipe propose également des <span className="highlight-pill">captations audiovisuelles</span> de grande qualité pour des artistes reconnus.
            </p>
            <p>
              Chaque projet s'appuie sur le meilleur matériel du marché, une exécution rigoureuse et un vrai sens du rythme visuel.
            </p>
          </article>
        </div>

        <article className="story-card story-card-accent">
          <div className="story-head">
            <div className="story-icon"><i className="fa-solid fa-star" /></div>
            <h3>Une signature forte</h3>
          </div>
          <p>
            Avec <span className="highlight-text">professionnalisme</span>, <span className="highlight-text">passion</span> et <span className="highlight-text">créativité</span>, <strong>Emjy Production</strong> s'impose comme un acteur incontournable de l'humour et de la production audiovisuelle.
          </p>
        </article>
      </div>

      <div className="interventions reveal">
        <h2><i className="fa-solid fa-location-dot" /> Où intervenons-nous ?</h2>
        <div className="cities">
          <div className="city"><BordeauxIcon className="city-svg" /><p><strong>Bordeaux & Sud-Ouest</strong></p></div>
          <div className="city"><ParisIcon className="city-svg" /><p><strong>Paris</strong></p></div>
          <div className="city"><LyonIcon className="city-svg" /><p><strong>Lyon</strong></p></div>
          <div className="city"><MarseilleIcon className="city-svg" /><p><strong>Marseille</strong></p></div>
        </div>
      </div>

      <div className="cta reveal">
        <p className="cta-title">Vous voulez une production ambitieuse ?</p>
        <p className="cta-copy">Nous sommes à votre écoute pour mettre en oeuvre vos projets. <strong>Discutons-en ensemble !</strong></p>
        <a href="mailto:contact@emjyproduction.com" className="btn contact-btn"><i className="fa-solid fa-paper-plane" /> Contactez-nous</a>
      </div>
    </section>
  );
}
