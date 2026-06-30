import { useEffect, useMemo, useState } from 'react';
import type { AlbumPhoto, AlbumWithPhotos } from '../lib/models';
import { subscribeAlbumsWithPhotos } from '../lib/siteContent';
import './GalleryPage.css';

export function GalleryPage() {
  const [albums, setAlbums] = useState<AlbumWithPhotos[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => subscribeAlbumsWithPhotos(setAlbums), []);

  useEffect(() => {
    if (!albums.length) {
      setSelectedAlbumId('');
      return;
    }

    if (!selectedAlbumId || !albums.some((album) => album.id === selectedAlbumId)) {
      setSelectedAlbumId(albums[0].id);
      setIndex(0);
    }
  }, [albums, selectedAlbumId]);

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.id === selectedAlbumId) ?? null,
    [albums, selectedAlbumId]
  );

  const currentPhoto: AlbumPhoto | null = selectedAlbum?.photos[index] ?? null;

  function nextPhoto() {
    if (!selectedAlbum?.photos.length) return;
    setIndex((value) => (value + 1) % selectedAlbum.photos.length);
  }

  function prevPhoto() {
    if (!selectedAlbum?.photos.length) return;
    setIndex((value) => (value - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
  }

  return (
    <section className="gallery-page">
      <h1 className="sr-only">Galerie photo Emjy Production</h1>
      <header className="gallery-hero">
        <h2>ALBUMS PHOTO</h2>
        <p>Découvrez ici toutes les photos de nos évènements</p>
      </header>

      <div className="albums-grid">
        {albums.map((album) => (
          <article key={album.id} className={`album ${selectedAlbumId === album.id ? 'active' : ''}`} onClick={() => { setSelectedAlbumId(album.id); setIndex(0); }}>
            <div className="album-cover"><img src={album.coverUrl} alt={album.title} loading="lazy" /></div>
            <div className="album-info"><h3>{album.title}</h3><p>{album.date}</p><small>{album.photos.length} photo(s)</small></div>
          </article>
        ))}
      </div>

      {selectedAlbum && (
        <section className="album-photos">
          <header><h3>{selectedAlbum.title}</h3><p>{selectedAlbum.date}</p></header>
          {currentPhoto ? (
            <div className="carousel-wrapper">
              <button type="button" className="carousel-btn" onClick={prevPhoto}><i className="fa-solid fa-chevron-left" /></button>
              <div className="carousel-image" onClick={() => setLightbox(currentPhoto.imageUrl)}><img src={currentPhoto.imageUrl} alt={currentPhoto.caption || selectedAlbum.title} /></div>
              <button type="button" className="carousel-btn" onClick={nextPhoto}><i className="fa-solid fa-chevron-right" /></button>
            </div>
          ) : (
            <div className="empty">Cet album est cree, mais il ne contient pas encore de photo.</div>
          )}

          {currentPhoto && <div className="meta"><p>{currentPhoto.caption || 'Sans legende'}</p><span>{index + 1} / {selectedAlbum.photos.length}</span></div>}

          <div className="thumbs">
            {selectedAlbum.photos.map((photo, photoIndex) => (
              <button type="button" key={photo.id} className={index === photoIndex ? 'active' : ''} onClick={() => setIndex(photoIndex)}>
                <img src={photo.imageUrl} alt={photo.caption || selectedAlbum.title} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {lightbox && <div className="lightbox" onClick={() => setLightbox(null)}><img src={lightbox} alt="Photo agrandie" /></div>}
    </section>
  );
}
