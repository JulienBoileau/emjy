import { FormEvent, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { FirebaseError } from 'firebase/app';
import { db } from '../lib/firebase';
import { useReveal } from '../lib/useReveal';
import './ContactPage.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactPage() {
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useReveal();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const societe = String(data.get('societe') || '').trim();
    const nom = String(data.get('nom') || '').trim();
    const email = String(data.get('email') || '').trim().toLowerCase();
    const service = String(data.get('service') || '').trim();
    const details = String(data.get('details') || '').trim();
    const consent = data.get('consent') === 'ok';

    if (!societe || !nom || !email || !service || !details || !consent) {
      setError('Veuillez remplir tous les champs et accepter le consentement.');
      return;
    }

    setError('');
    setStatus('loading');

    try {
      await addDoc(collection(db, 'contactRequests'), {
        societe,
        nom,
        email,
        service,
        details,
        consent,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      form.reset();
    } catch (err) {
      const firebaseError = err as FirebaseError;
      if (firebaseError?.code === 'permission-denied') {
        setError('Accès refusé par Firestore. Les règles ont besoin d\'être déployées.');
      } else if (firebaseError?.code === 'unavailable') {
        setError('Service temporairement indisponible. Réessayez dans un instant.');
      } else {
        setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      }
      setStatus('error');
    }
  }

  return (
    <section className="contact-page">
      <h1 className="sr-only">Contact Emjy Production</h1>
      <div className="contact-intro reveal">
        <div className="contact-title-row">
          <h2 className="contact-title">Contactez-nous</h2>
          <span className="contact-info-icon" aria-label="Information sur la collecte de données">
            <i className="fa-solid fa-circle-info" />
            <span className="contact-info-tooltip" role="tooltip">
              Les informations collectées via ce formulaire (nom, email, société, service souhaité) sont utilisées exclusivement par Emjy Production dans le cadre du traitement de votre demande. Elles ne sont pas partagées avec des tiers et sont conservées pour la durée nécessaire au suivi de votre demande, conformément au RGPD. Vous disposez d'un droit d'accès, de rectification et de suppression en écrivant à contact@emjyproduction.com.
            </span>
          </span>
        </div>
      </div>

      <div className="contact-container reveal">
        {status === 'success' ? (
          <div className="contact-success">
            <i className="fa-solid fa-circle-check" />
            <p>Message bien envoyé. Notre équipe vous recontacte rapidement.</p>
          </div>
        ) : (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-group"><label htmlFor="societe">Société</label><input id="societe" name="societe" required /></div>
          <div className="form-group"><label htmlFor="nom">Nom et prénom</label><input id="nom" name="nom" required /></div>
          <div className="form-group"><label htmlFor="email">Adresse e-mail</label><input id="email" type="email" name="email" required /></div>
          <div className="form-group"><label htmlFor="service">Service souhaité</label>
            <select id="service" name="service" required>
              <option value="">-- Sélectionnez un service --</option>
              <option>Captation vidéo</option>
              <option>Montage vidéo</option>
              <option>Captation + montage vidéo</option>
              <option>Organisation de Comedy Club</option>
            </select>
          </div>
          <div className="form-group"><label htmlFor="details">Détails de la demande</label><textarea id="details" name="details" rows={4} required placeholder="Décrivez votre besoin, le contexte, les dates souhaitées..." /></div>
          <div className="form-group checkbox">
            <input type="checkbox" id="consent" name="consent" value="ok" required />
            <label htmlFor="consent">J'autorise l'utilisation de mes données afin d'être contacté(e).</label>
          </div>
          {error && <p className="error">{error}</p>}
          {status === 'error' && !error && <p className="error">Une erreur est survenue. Veuillez réessayer.</p>}
          <button type="submit" className="submit-btn" disabled={status === 'loading'}>{status === 'loading' ? 'Envoi en cours…' : <>Envoyer <i className="fa-solid fa-paper-plane" /></>}</button>
        </form>
        )}
      </div>
    </section>
  );
}
