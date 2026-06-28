import { useState } from 'react';
import { createPortal } from 'react-dom';
import './SiteFooter.css';

type ModalType = 'mentions' | 'confidentialite' | null;

export function SiteFooter() {
  const [modal, setModal] = useState<ModalType>(null);

  const modalRoot = typeof document !== 'undefined' ? document.body : null;

  const modalContent = modal === 'mentions' ? (
    <div className="legal-modal" onClick={() => setModal(null)}>
      <div className="legal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="legal-close-btn" aria-label="Fermer la fenêtre" onClick={() => setModal(null)}>
          <i className="fa-solid fa-xmark" />
        </button>
        <h2>Mentions légales</h2>
        <p><strong>Propriétaire :</strong> EMJY PRODUCTION - SIRET 94371079800019</p>
        <p><strong>Adresse :</strong> 20 avenue du 15 août 1944 19360 Malemort, France</p>
        <p><strong>Email:</strong> contact@emjyproduction.com</p>
        <p><strong>Téléphone :</strong> 06 18 22 24 58</p>
        <p><strong>Hébergement :</strong> Hostinger International LTD</p>
      </div>
    </div>
  ) : modal === 'confidentialite' ? (
    <div className="legal-modal" onClick={() => setModal(null)}>
      <div className="legal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="legal-close-btn" aria-label="Fermer la fenêtre" onClick={() => setModal(null)}>
          <i className="fa-solid fa-xmark" />
        </button>
        <h2>Politique de confidentialité</h2>
        <p>Vos données sont utilisées uniquement pour traiter votre demande de contact. Aucune cession à des tiers.</p>
        <p>Conformément au RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données.</p>
      </div>
    </div>
  ) : null;

  return (
    <footer className="site-footer">
      <div className="footer-links">
        <button type="button" onClick={() => setModal('mentions')}>Mentions légales</button>
        <span>|</span>
        <button type="button" onClick={() => setModal('confidentialite')}>Politique de confidentialité</button>
      </div>
      <div className="footer-copy">© 2025 Emjy Production. Tous droits réservés. Site développé par Kodium.</div>

      {modalRoot && modalContent ? createPortal(modalContent, modalRoot) : null}
    </footer>
  );
}
