import { FormEvent, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useReveal } from '../lib/useReveal';
import './NewsletterPage.css';

const DEPARTEMENTS = [
  '01 – Ain', '02 – Aisne', '03 – Allier', '04 – Alpes-de-Haute-Provence', '05 – Hautes-Alpes',
  '06 – Alpes-Maritimes', '07 – Ardèche', '08 – Ardennes', '09 – Ariège', '10 – Aube',
  '11 – Aude', '12 – Aveyron', '13 – Bouches-du-Rhône', '14 – Calvados', '15 – Cantal',
  '16 – Charente', '17 – Charente-Maritime', '18 – Cher', '19 – Corrèze', '2A – Corse-du-Sud',
  '2B – Haute-Corse', '21 – Côte-d\'Or', '22 – Côtes-d\'Armor', '23 – Creuse', '24 – Dordogne',
  '25 – Doubs', '26 – Drôme', '27 – Eure', '28 – Eure-et-Loir', '29 – Finistère',
  '30 – Gard', '31 – Haute-Garonne', '32 – Gers', '33 – Gironde', '34 – Hérault',
  '35 – Ille-et-Vilaine', '36 – Indre', '37 – Indre-et-Loire', '38 – Isère', '39 – Jura',
  '40 – Landes', '41 – Loir-et-Cher', '42 – Loire', '43 – Haute-Loire', '44 – Loire-Atlantique',
  '45 – Loiret', '46 – Lot', '47 – Lot-et-Garonne', '48 – Lozère', '49 – Maine-et-Loire',
  '50 – Manche', '51 – Marne', '52 – Haute-Marne', '53 – Mayenne', '54 – Meurthe-et-Moselle',
  '55 – Meuse', '56 – Morbihan', '57 – Moselle', '58 – Nièvre', '59 – Nord',
  '60 – Oise', '61 – Orne', '62 – Pas-de-Calais', '63 – Puy-de-Dôme', '64 – Pyrénées-Atlantiques',
  '65 – Hautes-Pyrénées', '66 – Pyrénées-Orientales', '67 – Bas-Rhin', '68 – Haut-Rhin', '69 – Rhône',
  '70 – Haute-Saône', '71 – Saône-et-Loire', '72 – Sarthe', '73 – Savoie', '74 – Haute-Savoie',
  '75 – Paris', '76 – Seine-Maritime', '77 – Seine-et-Marne', '78 – Yvelines', '79 – Deux-Sèvres',
  '80 – Somme', '81 – Tarn', '82 – Tarn-et-Garonne', '83 – Var', '84 – Vaucluse',
  '85 – Vendée', '86 – Vienne', '87 – Haute-Vienne', '88 – Vosges', '89 – Yonne',
  '90 – Territoire de Belfort', '91 – Essonne', '92 – Hauts-de-Seine', '93 – Seine-Saint-Denis',
  '94 – Val-de-Marne', '95 – Val-d\'Oise',
  '971 – Guadeloupe', '972 – Martinique', '973 – Guyane', '974 – La Réunion', '976 – Mayotte',
];

interface FormState {
  nom: string;
  prenom: string;
  departement: string;
  email: string;
  telephone: string;
}

const EMPTY: FormState = { nom: '', prenom: '', departement: '', email: '', telephone: '' };

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useReveal();

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.nom || !form.prenom || !form.departement || !form.email) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setError('');
    setStatus('loading');

    try {
      await addDoc(collection(db, 'newsletter'), {
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        departement: form.departement,
        email: form.email.trim().toLowerCase(),
        telephone: form.telephone.trim() || null,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter-page">
      <h1 className="sr-only">Newsletter Emjy Production</h1>
      <div className="newsletter-intro reveal">
        <div className="newsletter-title-row">
          <h2 className="newsletter-title">Newsletter</h2>
          <span className="newsletter-info-icon" aria-label="Information sur la collecte de données">
            <i className="fa-solid fa-circle-info" />
            <span className="newsletter-info-tooltip" role="tooltip">
              Les informations collectées via ce formulaire (nom, prénom, département, email, téléphone optionnel)
              sont utilisées exclusivement par Emjy Production pour vous envoyer notre newsletter.
              Elles ne sont pas partagées avec des tiers et sont conservées jusqu'à désinscription de votre part,
              conformément au RGPD. Vous disposez d'un droit d'accès, de rectification et de suppression
              en écrivant à contact@emjyproduction.com.
            </span>
          </span>
        </div>
      </div>

      <div className="newsletter-container reveal">
        {status === 'success' ? (
          <div className="newsletter-success">
            <i className="fa-solid fa-circle-check" />
            <p>Inscription confirmée ! Merci de rejoindre la newsletter Emjy Production.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <div className="nl-row">
              <div className="form-group">
                <label htmlFor="nl-prenom">Prénom <span aria-hidden="true">*</span></label>
                <input id="nl-prenom" name="prenom" value={form.prenom} onChange={update('prenom')} required autoComplete="given-name" />
              </div>
              <div className="form-group">
                <label htmlFor="nl-nom">Nom <span aria-hidden="true">*</span></label>
                <input id="nl-nom" name="nom" value={form.nom} onChange={update('nom')} required autoComplete="family-name" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nl-dept">Département <span aria-hidden="true">*</span></label>
              <select id="nl-dept" name="departement" value={form.departement} onChange={update('departement')} required>
                <option value="">— Sélectionnez votre département —</option>
                {DEPARTEMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nl-email">Adresse e-mail <span aria-hidden="true">*</span></label>
              <input id="nl-email" name="email" type="email" value={form.email} onChange={update('email')} required autoComplete="email" />
            </div>

            <div className="form-group">
              <label htmlFor="nl-tel">Téléphone <span className="optional">(optionnel)</span></label>
              <input id="nl-tel" name="telephone" type="tel" value={form.telephone} onChange={update('telephone')} autoComplete="tel" />
            </div>

            {error && <p className="nl-error">{error}</p>}
            {status === 'error' && <p className="nl-error">Une erreur est survenue. Veuillez réessayer.</p>}

            <button type="submit" className="submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Envoi en cours…' : <>S'inscrire <i className="fa-solid fa-envelope" /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
