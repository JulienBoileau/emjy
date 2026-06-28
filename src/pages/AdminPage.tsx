import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  isAllowedEmail,
  signInAdmin,
  signOutAdmin,
  signUpAdmin,
  subscribeAuth
} from '../lib/adminAuth';
import type {
  AgendaEvent,
  AgendaEventInput,
  AlbumInput,
  AlbumWithPhotos,
  ContactRequest,
  HomeHeroContent,
  NewsletterSubscriber
} from '../lib/models';
import {
  addAgendaEvent,
  addAlbumPhoto,
  createAlbum,
  deleteAgendaEvent,
  deleteAlbum,
  deleteAlbumPhoto,
  deleteStorageFile,
  saveHomepageContent,
  updateAlbumCover,
  uploadAlbumCover,
  uploadAlbumPhoto,
  uploadHomepageImage
} from '../lib/adminContent';
import {
  subscribeAgendaEvents,
  subscribeAlbumsWithPhotos,
  subscribeContactRequests,
  subscribeHomepageContent,
  subscribeNewsletterSubscribers,
} from '../lib/siteContent';
import './AdminPage.css';

type AuthMode = 'signup' | 'signin';
type Tab = 'accueil' | 'agenda' | 'albums' | 'contacts' | 'newsletter';

interface PendingPhotoUpload {
  id: string;
  file: File;
  previewUrl: string;
}

const fallbackHome: HomeHeroContent = {
  heroImageUrl: 'assets/affiche_octobre.jpeg',
  heroImageAlt: 'Affiche spectacle',
  ticketUrl: 'https://www.chateau-desdauphins.fr/',
  badgeText: 'Bientôt'
};

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [activeTab, setActiveTab] = useState<Tab>('accueil');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [homepage, setHomepage] = useState<HomeHeroContent>(fallbackHome);
  const [heroImageAlt, setHeroImageAlt] = useState(fallbackHome.heroImageAlt);
  const [ticketUrl, setTicketUrl] = useState(fallbackHome.ticketUrl);
  const [homepageFile, setHomepageFile] = useState<File | null>(null);
  const [homepagePreviewUrl, setHomepagePreviewUrl] = useState<string | null>(null);
  const [homepageFileLabel, setHomepageFileLabel] = useState('Aucun fichier choisi');

  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const agendaDateInputRef = useRef<HTMLInputElement | null>(null);
  const [eventInput, setEventInput] = useState<AgendaEventInput>({
    date: '',
    title: '',
    info: '',
    lieu: '',
    adresse: '',
    heure: '',
    billetterie: ''
  });

  const [albums, setAlbums] = useState<AlbumWithPhotos[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [showCreateAlbumModal, setShowCreateAlbumModal] = useState(false);
  const [showAddPhotosModal, setShowAddPhotosModal] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<AlbumWithPhotos | null>(null);

  const [albumInput, setAlbumInput] = useState<AlbumInput>({
    title: '',
    date: '',
    description: '',
    coverUrl: ''
  });
  const [albumCoverFile, setAlbumCoverFile] = useState<File | null>(null);
  const [albumCoverPreviewUrl, setAlbumCoverPreviewUrl] = useState<string | null>(null);
  const [albumCoverFileLabel, setAlbumCoverFileLabel] = useState('Aucun fichier choisi');

  const [caption, setCaption] = useState('');
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhotoUpload[]>([]);
  const [albumPhotosFileLabel, setAlbumPhotosFileLabel] = useState('Aucun fichier choisi');

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [contactSearch, setContactSearch] = useState('');
  const [contactServiceFilter, setContactServiceFilter] = useState('all');
  const [selectedContactRequest, setSelectedContactRequest] = useState<ContactRequest | null>(null);

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [newsletterSearch, setNewsletterSearch] = useState('');
  const [newsletterDeptFilter, setNewsletterDeptFilter] = useState('all');

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.id === selectedAlbumId) ?? null,
    [albums, selectedAlbumId]
  );

  const availableContactServices = useMemo(
    () => Array.from(new Set(contactRequests.map((item) => item.service).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'fr')),
    [contactRequests]
  );

  const filteredContacts = useMemo(() => {
    const query = contactSearch.trim().toLowerCase();
    return contactRequests.filter((item) => {
      const byService = contactServiceFilter === 'all' || item.service === contactServiceFilter;
      if (!byService) return false;
      if (!query) return true;
      const haystack = `${item.nom} ${item.email} ${item.societe} ${item.service} ${item.details}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [contactRequests, contactSearch, contactServiceFilter]);

  const availableNewsletterDepartments = useMemo(
    () => Array.from(new Set(newsletterSubscribers.map((item) => item.departement).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'fr')),
    [newsletterSubscribers]
  );

  const filteredNewsletterSubscribers = useMemo(() => {
    const query = newsletterSearch.trim().toLowerCase();
    return newsletterSubscribers.filter((item) => {
      const byDepartment = newsletterDeptFilter === 'all' || item.departement === newsletterDeptFilter;
      if (!byDepartment) return false;
      if (!query) return true;
      const haystack = `${item.nom} ${item.prenom} ${item.email} ${item.departement} ${item.telephone}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [newsletterSubscribers, newsletterSearch, newsletterDeptFilter]);

  useEffect(() => {
    const unAuth = subscribeAuth(async (currentUser) => {
      if (currentUser && !isAllowedEmail(currentUser.email)) {
        await signOutAdmin();
        setUser(null);
        setError('Compte non autorisé.');
        return;
      }
      setUser(currentUser);
    });

    const unHome = subscribeHomepageContent((content) => {
      setHomepage(content);
      setHeroImageAlt(content.heroImageAlt || fallbackHome.heroImageAlt);
      setTicketUrl(content.ticketUrl || fallbackHome.ticketUrl);
    });

    const unAgenda = subscribeAgendaEvents(setEvents);
    const unContacts = subscribeContactRequests(setContactRequests);
    const unNewsletter = subscribeNewsletterSubscribers(setNewsletterSubscribers);
    const unAlbums = subscribeAlbumsWithPhotos((next) => {
      setAlbums(next);
      if (!selectedAlbumId && next.length) setSelectedAlbumId(next[0].id);
      if (selectedAlbumId && !next.some((album) => album.id === selectedAlbumId)) {
        setSelectedAlbumId(next[0]?.id ?? '');
      }
    });

    return () => {
      unAuth();
      unHome();
      unAgenda();
      unContacts();
      unNewsletter();
      unAlbums();
      if (homepagePreviewUrl) URL.revokeObjectURL(homepagePreviewUrl);
      if (albumCoverPreviewUrl) URL.revokeObjectURL(albumCoverPreviewUrl);
      pendingPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [albumCoverPreviewUrl, homepagePreviewUrl, pendingPhotos, selectedAlbumId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function toError(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
  }

  function formatDateTime(value: unknown): string {
    if (!value) return 'Date indisponible';

    if (value instanceof Date) {
      return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(value);
    }

    if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
      return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format((value as { toDate: () => Date }).toDate());
    }

    return 'Date indisponible';
  }

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`Copié: ${value}`);
    } catch {
      setError('Impossible de copier dans le presse-papiers.');
    }
  }

  function exportNewsletterCsv() {
    if (!filteredNewsletterSubscribers.length) {
      setError('Aucun contact newsletter à exporter.');
      return;
    }

    const rows = [
      ['prenom', 'nom', 'email', 'departement', 'telephone', 'dateInscription'],
      ...filteredNewsletterSubscribers.map((item) => [
        item.prenom,
        item.nom,
        item.email,
        item.departement,
        item.telephone || '',
        formatDateTime(item.createdAt)
      ])
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
      .join('\n');

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `newsletter-emjy-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast('Export newsletter téléchargé.');
  }

  function openContactDetails(item: ContactRequest) {
    setSelectedContactRequest(item);
  }

  function closeContactDetails() {
    setSelectedContactRequest(null);
  }

  function resetAlerts() {
    setError('');
    setMessage('');
  }

  function renderDismissibleAlert(
    text: string,
    kind: 'ok' | 'error',
    onClose: () => void
  ) {
    return (
      <div className={`feedback ${kind}`} role="status">
        <span>{text}</span>
        <button type="button" className="alert-close" onClick={onClose} aria-label="Fermer l'alerte">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>
    );
  }

  function renderDismissibleToast(text: string, onClose: () => void) {
    return (
      <div className="toast" role="status">
        <span>{text}</span>
        <button type="button" className="alert-close" onClick={onClose} aria-label="Fermer la notification">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>
    );
  }

  function openAgendaDatePicker() {
    const input = agendaDateInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  }

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authEmail || !authPassword) {
      setError('Renseigne ton e-mail et ton mot de passe.');
      return;
    }

    setAuthLoading(true);
    resetAlerts();
    try {
      if (authMode === 'signup') {
        await signUpAdmin(authEmail, authPassword);
        setMessage('Compte créé. Connecte-toi maintenant.');
        setAuthMode('signin');
      } else {
        await signInAdmin(authEmail, authPassword);
        setMessage('Connexion admin activée.');
      }
      setAuthPassword('');
    } catch (err) {
      setError(toError(err));
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleSaveHomepage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    resetAlerts();
    try {
      const heroImageUrl = homepageFile ? await uploadHomepageImage(homepageFile) : homepage.heroImageUrl;
      await saveHomepageContent({
        heroImageUrl,
        heroImageAlt,
        ticketUrl,
        badgeText: homepage.badgeText || fallbackHome.badgeText
      });
      setMessage('Accueil mis à jour.');
      setHomepageFile(null);
      setHomepageFileLabel('Aucun fichier choisi');
      if (homepagePreviewUrl) URL.revokeObjectURL(homepagePreviewUrl);
      setHomepagePreviewUrl(null);
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAgendaEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    resetAlerts();

    try {
      await addAgendaEvent(eventInput);
      setEventInput({ date: '', title: '', info: '', lieu: '', adresse: '', heure: '', billetterie: '' });
      setMessage('Date ajoutée.');
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  async function removeAgendaEvent(id: string) {
    setLoading(true);
    resetAlerts();
    try {
      await deleteAgendaEvent(id);
      setMessage('Date supprimée.');
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  function openCreateAlbumModal() {
    resetAlerts();
    setShowCreateAlbumModal(true);
  }

  function closeCreateAlbumModal() {
    setShowCreateAlbumModal(false);
    setAlbumInput({ title: '', date: '', description: '', coverUrl: '' });
    setAlbumCoverFile(null);
    setAlbumCoverFileLabel('Aucun fichier choisi');
    if (albumCoverPreviewUrl) URL.revokeObjectURL(albumCoverPreviewUrl);
    setAlbumCoverPreviewUrl(null);
  }

  async function handleCreateAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    resetAlerts();

    try {
      const albumId = await createAlbum(albumInput);
      if (albumCoverFile) {
        const coverUrl = await uploadAlbumCover(albumId, albumCoverFile);
        await updateAlbumCover(albumId, coverUrl);
      }
      setSelectedAlbumId(albumId);
      closeCreateAlbumModal();
      setMessage('Album cree avec succes.');
      setToast('Album cree avec succes.');
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  function openAddPhotosModal(albumId?: string) {
    if (albumId) setSelectedAlbumId(albumId);
    if (!albumId && !selectedAlbumId) {
      setError('Sélectionne un album avant d\'ajouter des photos.');
      return;
    }
    resetAlerts();
    setShowAddPhotosModal(true);
  }

  function closeAddPhotosModal() {
    setShowAddPhotosModal(false);
    setCaption('');
    pendingPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    setPendingPhotos([]);
    setAlbumPhotosFileLabel('Aucun fichier choisi');
  }

  async function handleUploadPhotos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedAlbumId) {
      setError('Sélectionne un album avant d\'ajouter des photos.');
      return;
    }
    if (!pendingPhotos.length) {
      setError('Sélectionne une ou plusieurs photos à téléverser.');
      return;
    }

    setLoading(true);
    resetAlerts();
    try {
      await Promise.all(
        pendingPhotos.map(async (photo) => {
          const url = await uploadAlbumPhoto(selectedAlbumId, photo.file);
          await addAlbumPhoto(selectedAlbumId, url, caption);
        })
      );
      closeAddPhotosModal();
      setMessage('Photos ajoutées instantanément dans l\'album.');
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  async function removePhoto(albumId: string, photoId: string, imageUrl: string) {
    setLoading(true);
    resetAlerts();
    try {
      await deleteAlbumPhoto(albumId, photoId);
      await deleteStorageFile(imageUrl);
      setMessage('Photo supprimée.');
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  function requestAlbumDelete(album: AlbumWithPhotos) {
    setAlbumToDelete(album);
  }

  function cancelAlbumDelete() {
    setAlbumToDelete(null);
  }

  async function confirmAlbumDelete() {
    if (!albumToDelete) return;

    setLoading(true);
    resetAlerts();
    try {
      await Promise.all(
        albumToDelete.photos.map(async (photo) => {
          await deleteAlbumPhoto(albumToDelete.id, photo.id);
          await deleteStorageFile(photo.imageUrl);
        })
      );
      if (albumToDelete.coverUrl) await deleteStorageFile(albumToDelete.coverUrl);
      await deleteAlbum(albumToDelete.id);
      setMessage('Album supprimé.');
      setAlbumToDelete(null);
    } catch (err) {
      setError(toError(err));
    } finally {
      setLoading(false);
    }
  }

  function handleHomepageFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (homepagePreviewUrl) URL.revokeObjectURL(homepagePreviewUrl);
    setHomepageFile(file);
    setHomepageFileLabel(file?.name ?? 'Aucun fichier choisi');
    setHomepagePreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  function handleAlbumCoverFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (albumCoverPreviewUrl) URL.revokeObjectURL(albumCoverPreviewUrl);
    setAlbumCoverFile(file);
    setAlbumCoverFileLabel(file?.name ?? 'Aucun fichier choisi');
    setAlbumCoverPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  function handleAlbumPhotosFile(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setAlbumPhotosFileLabel(files.length === 1 ? files[0].name : `${files.length} fichiers sélectionnés`);
    setPendingPhotos((current) => [
      ...current,
      ...files.map((file) => ({ id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file) }))
    ]);

    event.target.value = '';
  }

  function removePendingPhoto(photoId: string) {
    setPendingPhotos((current) => {
      const target = current.find((photo) => photo.id === photoId);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((photo) => photo.id !== photoId);
    });
  }

  if (!user) {
    return (
      <section className="admin-shell auth-view">
        <div className="auth-card">
          <h1>Admin EMJY</h1>
          <p>Créer un compte puis se connecter (e-mails autorisés uniquement).</p>

          <div className="auth-toggle">
            <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Créer un compte</button>
            <button type="button" className={authMode === 'signin' ? 'active' : ''} onClick={() => setAuthMode('signin')}>Se connecter</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="auth-form">
            <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="exemple@mail.com" required />
            <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Mot de passe" required />
            <button type="submit" className="primary" disabled={authLoading}>{authMode === 'signup' ? 'Créer le compte' : 'Se connecter'}</button>
          </form>

          {error && renderDismissibleAlert(error, 'error', () => setError(''))}
          {message && renderDismissibleAlert(message, 'ok', () => setMessage(''))}
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">EMJY CONTROL ROOM</p>
          <h1>Administration du contenu</h1>
          <p className="subtitle">Connecté en tant que {user.email}</p>
        </div>
        <button type="button" className="ghost" onClick={() => signOutAdmin()}>Se déconnecter</button>
      </header>

      <nav className="tabs">
        <button type="button" className={activeTab === 'accueil' ? 'active' : ''} onClick={() => setActiveTab('accueil')}>Accueil</button>
        <button type="button" className={activeTab === 'agenda' ? 'active' : ''} onClick={() => setActiveTab('agenda')}>Agenda</button>
        <button type="button" className={activeTab === 'albums' ? 'active' : ''} onClick={() => setActiveTab('albums')}>Albums</button>
        <button type="button" className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>Contacts</button>
        <button type="button" className={activeTab === 'newsletter' ? 'active' : ''} onClick={() => setActiveTab('newsletter')}>Newsletter</button>
      </nav>

      {message && renderDismissibleAlert(message, 'ok', () => setMessage(''))}
      {error && renderDismissibleAlert(error, 'error', () => setError(''))}
      {toast && renderDismissibleToast(toast, () => setToast(''))}

      {activeTab === 'accueil' && (
        <section className="panel">
          <h2>Accueil</h2>
          <div className="media-preview">
            <img src={homepagePreviewUrl ?? homepage.heroImageUrl} alt={heroImageAlt || 'Aperçu'} />
          </div>

          <form className="form-grid" onSubmit={handleSaveHomepage}>
            <label>Description de l'image<input value={heroImageAlt} onChange={(e) => setHeroImageAlt(e.target.value)} required /></label>
            <label>Lien billetterie<input type="url" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} required /></label>
            <div className="file-field homepage-file-field full">
              <input id="homepage-file" className="hidden-file" type="file" accept="image/*" onChange={handleHomepageFile} />
              <label className="file-button premium-file-button" htmlFor="homepage-file">
                <i className="fa-regular fa-image" aria-hidden="true" />
                Choisir une image
              </label>
              <small>{homepageFileLabel}</small>
            </div>
            <button className="primary" type="submit" disabled={loading}>Mettre en ligne</button>
          </form>
        </section>
      )}

      {activeTab === 'agenda' && (
        <section className="panel">
          <h2>Agenda</h2>
          <form className="form-grid" onSubmit={handleAddAgendaEvent}>
            <label>
              Date
              <div className="date-input-wrapper">
                <input
                  ref={agendaDateInputRef}
                  type="date"
                  value={eventInput.date}
                  onChange={(e) => setEventInput({ ...eventInput, date: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="calendar-trigger"
                  onClick={openAgendaDatePicker}
                  aria-label="Choisir une date"
                >
                  <i className="fa-regular fa-calendar" aria-hidden="true" />
                </button>
              </div>
            </label>
            <label>Titre<input value={eventInput.title} onChange={(e) => setEventInput({ ...eventInput, title: e.target.value })} required /></label>
            <label>Info<input value={eventInput.info} onChange={(e) => setEventInput({ ...eventInput, info: e.target.value })} required /></label>
            <label>Lieu<input value={eventInput.lieu} onChange={(e) => setEventInput({ ...eventInput, lieu: e.target.value })} required /></label>
            <label>Adresse<input value={eventInput.adresse} onChange={(e) => setEventInput({ ...eventInput, adresse: e.target.value })} required /></label>
            <label>Heure<input value={eventInput.heure} onChange={(e) => setEventInput({ ...eventInput, heure: e.target.value })} required /></label>
            <label>Billetterie<input value={eventInput.billetterie} onChange={(e) => setEventInput({ ...eventInput, billetterie: e.target.value })} required /></label>
            <button className="primary" type="submit" disabled={loading}>Ajouter</button>
          </form>

          <div className="rows">
            {events.map((item) => (
              <article key={item.id} className="row">
                <div><strong>{item.title}</strong><p>{item.date} · {item.lieu} · {item.heure}</p></div>
                <button type="button" className="danger" onClick={() => removeAgendaEvent(item.id)}>Supprimer</button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'albums' && (
        <section className="panel">
          <h2>Albums photo</h2>
          <div className="actions-row">
            <button className="primary" type="button" onClick={openCreateAlbumModal}>Créer un album</button>
            <button className="primary secondary" type="button" onClick={() => openAddPhotosModal()}>Ajouter des photos</button>
          </div>

          <div className="album-list">
            {albums.map((album) => (
              <article key={album.id} className={`album-card ${selectedAlbum?.id === album.id ? 'selected' : ''}`}>
                <header>
                  <div>
                    <h3>{album.title}</h3>
                    <p>{album.date} · {album.photos.length} photo(s)</p>
                  </div>
                  <div className="actions-inline">
                    <button type="button" className="ghost" onClick={() => openAddPhotosModal(album.id)}><i className="fa-solid fa-plus" /> Ajouter des photos</button>
                    <button type="button" className="danger" onClick={() => requestAlbumDelete(album)}><i className="fa-solid fa-trash" /> Supprimer album</button>
                  </div>
                </header>
                <div className="photo-strip">
                  {album.photos.map((photo) => (
                    <figure key={photo.id}>
                      <img src={photo.imageUrl} alt={photo.caption || album.title} loading="lazy" />
                      <figcaption>{photo.caption || 'Sans légende'}</figcaption>
                      <button type="button" className="danger chip" onClick={() => removePhoto(album.id, photo.id, photo.imageUrl)}>Supprimer</button>
                    </figure>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {showCreateAlbumModal && (
            <div className="modal-bg" onClick={closeCreateAlbumModal}>
              <section className="modal-card" onClick={(event) => event.stopPropagation()}>
                <header className="modal-head"><h3>Créer un album</h3><button type="button" className="ghost" onClick={closeCreateAlbumModal}>Fermer</button></header>
                <div className="modal-scroll">
                  {error && renderDismissibleAlert(error, 'error', () => setError(''))}
                  {albumCoverPreviewUrl && <div className="media-preview"><img src={albumCoverPreviewUrl} alt="Aperçu cover" /></div>}

                  <form id="create-album-form" className="form-grid" onSubmit={handleCreateAlbum}>
                    <label>Titre<input value={albumInput.title} onChange={(e) => setAlbumInput({ ...albumInput, title: e.target.value })} required /></label>
                    <label>Date<input value={albumInput.date} onChange={(e) => setAlbumInput({ ...albumInput, date: e.target.value })} required /></label>
                    <label className="full">Description<input value={albumInput.description} onChange={(e) => setAlbumInput({ ...albumInput, description: e.target.value })} required /></label>
                    <div className="file-field full">
                      <span>Cover</span>
                      <input id="album-cover-file" className="hidden-file" type="file" accept="image/*" onChange={handleAlbumCoverFile} />
                      <label className="file-button" htmlFor="album-cover-file">Choisir une cover</label>
                      <small>{albumCoverFileLabel}</small>
                    </div>
                  </form>
                </div>
                <footer className="modal-footer sticky-footer">
                  <button type="submit" form="create-album-form" className="primary" disabled={loading}>Ajouter</button>
                </footer>
              </section>
            </div>
          )}

          {showAddPhotosModal && (
            <div className="modal-bg" onClick={closeAddPhotosModal}>
              <section className="modal-card" onClick={(event) => event.stopPropagation()}>
                <header className="modal-head"><h3>Ajouter des photos</h3><button type="button" className="ghost" onClick={closeAddPhotosModal}>Fermer</button></header>
                <div className="modal-scroll">
                  {error && renderDismissibleAlert(error, 'error', () => setError(''))}

                  <form id="album-photos-form" className="form-grid" onSubmit={handleUploadPhotos}>
                    <label className="full">
                      Album cible
                      <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)}>
                        <option value="">Sélectionner un album</option>
                        {albums.map((album) => <option key={album.id} value={album.id}>{album.title}</option>)}
                      </select>
                    </label>
                    <div className="file-field full">
                      <span>Photos</span>
                      <input id="album-photos-file" className="hidden-file" type="file" accept="image/*" multiple onChange={handleAlbumPhotosFile} />
                      <label className="file-button" htmlFor="album-photos-file">Choisir des photos</label>
                      <small>{albumPhotosFileLabel}</small>
                    </div>
                    <label>Légende commune<input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Optionnel" /></label>
                  </form>

                  {pendingPhotos.length > 0 && (
                    <div className="selection-grid">
                      {pendingPhotos.map((photo) => (
                        <article key={photo.id} className="selection-card">
                          <img src={photo.previewUrl} alt={photo.file.name} />
                          <div className="selection-actions">
                            <span>{photo.file.name}</span>
                            <button type="button" className="danger chip" onClick={() => removePendingPhoto(photo.id)}>Retirer</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <footer className="modal-footer">
                  <button className="primary" type="submit" form="album-photos-form" disabled={loading || !pendingPhotos.length}>Ajouter les photos</button>
                </footer>
              </section>
            </div>
          )}

          {albumToDelete && (
            <div className="modal-bg" onClick={cancelAlbumDelete}>
              <section className="modal-card confirm-modal" onClick={(event) => event.stopPropagation()}>
                <header className="modal-head">
                  <h3>Confirmer la suppression</h3>
                  <button type="button" className="ghost" onClick={cancelAlbumDelete}>Fermer</button>
                </header>
                <p>Voulez-vous vraiment supprimer l'album <strong>{albumToDelete.title}</strong> et toutes ses photos ?</p>
                <footer className="modal-footer">
                  <button type="button" className="ghost" onClick={cancelAlbumDelete} disabled={loading}>Annuler</button>
                  <button type="button" className="danger" onClick={confirmAlbumDelete} disabled={loading}>Supprimer définitivement</button>
                </footer>
              </section>
            </div>
          )}
        </section>
      )}

      {activeTab === 'contacts' && (
        <section className="panel inbox-panel">
          <header className="inbox-head">
            <div>
              <h2>Demandes de contact</h2>
              <p>Suivi centralisé des demandes envoyées depuis le site.</p>
            </div>
            <div className="inbox-stats">
              <span>{contactRequests.length} demandes</span>
              <span>{filteredContacts.length} visibles</span>
            </div>
          </header>

          <div className="inbox-toolbar">
            <label>
              Recherche
              <input
                value={contactSearch}
                onChange={(event) => setContactSearch(event.target.value)}
                placeholder="Nom, société, email..."
              />
            </label>
            <label>
              Service
              <select value={contactServiceFilter} onChange={(event) => setContactServiceFilter(event.target.value)}>
                <option value="all">Tous les services</option>
                {availableContactServices.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="inbox-grid">
            {filteredContacts.map((item) => (
              <article key={item.id} className="inbox-card contact-card">
                <header>
                  <h3>{item.societe || 'Société non renseignée'}</h3>
                  <span>{formatDateTime(item.createdAt)}</span>
                </header>
                <p className="inbox-company">{item.nom || 'Nom indisponible'}</p>
                <div className="inbox-tags">
                  <span>{item.service || 'Service non renseigné'}</span>
                  <span>{item.consent ? 'Consentement validé' : 'Consentement manquant'}</span>
                </div>
                <footer>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </footer>
                <div className="contact-card-actions">
                  <button type="button" className="ghost view-contact-btn" onClick={() => openContactDetails(item)} aria-label="Voir les détails de la demande">
                    <i className="fa-regular fa-eye" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {!filteredContacts.length && <p className="empty-state">Aucune demande ne correspond aux filtres actuels.</p>}
        </section>
      )}

      {activeTab === 'newsletter' && (
        <section className="panel inbox-panel">
          <header className="inbox-head">
            <div>
              <h2>Inscriptions newsletter</h2>
              <p>Base des abonnés collectée via le formulaire du site.</p>
            </div>
            <div className="inbox-stats">
              <span>{newsletterSubscribers.length} inscrits</span>
              <button type="button" className="ghost export-csv-btn" onClick={exportNewsletterCsv}>
                <i className="fa-solid fa-file-csv" /> Export CSV
              </button>
            </div>
          </header>

          <div className="inbox-toolbar">
            <label>
              Recherche
              <input
                value={newsletterSearch}
                onChange={(event) => setNewsletterSearch(event.target.value)}
                placeholder="Nom, email, département..."
              />
            </label>
            <label>
              Département
              <select value={newsletterDeptFilter} onChange={(event) => setNewsletterDeptFilter(event.target.value)}>
                <option value="all">Tous les départements</option>
                {availableNewsletterDepartments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="inbox-grid">
            {filteredNewsletterSubscribers.map((item) => (
              <article key={item.id} className="inbox-card newsletter-card">
                <header>
                  <h3>{item.prenom} {item.nom}</h3>
                  <span>{formatDateTime(item.createdAt)}</span>
                </header>
                <div className="inbox-tags">
                  <span>{item.departement || 'Département non renseigné'}</span>
                  {item.telephone && <span>{item.telephone}</span>}
                </div>
                <footer>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                  <button type="button" className="ghost copy-email-btn" onClick={() => copyToClipboard(item.email)} aria-label="Copier l'email">
                    <i className="fa-regular fa-copy" aria-hidden="true" />
                  </button>
                </footer>
              </article>
            ))}
          </div>

          {!filteredNewsletterSubscribers.length && <p className="empty-state">Aucun inscrit ne correspond aux filtres actuels.</p>}
        </section>
      )}

      {selectedContactRequest && (
        <div className="modal-bg" onClick={closeContactDetails}>
          <section className="modal-card contact-details-modal" onClick={(event) => event.stopPropagation()}>
            <header className="modal-head">
              <h3>Détails de la demande</h3>
              <button type="button" className="ghost" onClick={closeContactDetails}>Fermer</button>
            </header>

            <div className="contact-detail-grid">
              <article>
                <h4>Identité</h4>
                <p><strong>Nom:</strong> {selectedContactRequest.nom || 'Non renseigné'}</p>
                <p><strong>Email:</strong> {selectedContactRequest.email || 'Non renseigné'}</p>
                <p><strong>Société:</strong> {selectedContactRequest.societe || 'Non renseignée'}</p>
              </article>
              <article>
                <h4>Demande</h4>
                <p><strong>Service:</strong> {selectedContactRequest.service || 'Non renseigné'}</p>
                <p><strong>Consentement:</strong> {selectedContactRequest.consent ? 'Oui' : 'Non'}</p>
                <p><strong>Reçu le:</strong> {formatDateTime(selectedContactRequest.createdAt)}</p>
              </article>
            </div>

            <article className="contact-detail-message">
              <h4>Détails de la demande</h4>
              <p>{selectedContactRequest.details || 'Aucun détail fourni.'}</p>
            </article>

            <footer className="modal-footer">
              <button type="button" className="ghost" onClick={() => copyToClipboard(selectedContactRequest.email)}>
                <i className="fa-regular fa-copy" /> Copier l'email
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
