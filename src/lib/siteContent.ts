import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  AgendaEvent,
  Album,
  AlbumPhoto,
  AlbumWithPhotos,
  ContactRequest,
  HomeHeroContent,
  NewsletterSubscriber
} from './models';

const defaultHero: HomeHeroContent = {
  heroImageUrl: 'assets/affiche_octobre.jpeg',
  heroImageAlt: 'Affiche spectacle',
  ticketUrl: 'https://www.chateau-desdauphins.fr/',
  badgeText: 'Bientot'
};

function readString(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  return typeof value === 'string' ? value : '';
}

export function subscribeHomepageContent(
  onChange: (content: HomeHeroContent) => void,
  onError?: (error: unknown) => void
): () => void {
  return onSnapshot(
    doc(db, 'siteContent', 'homepage'),
    (snapshot) => {
      const data = snapshot.data() as Record<string, unknown> | undefined;

      if (!data) {
        onChange(defaultHero);
        return;
      }

      onChange({
        heroImageUrl: readString(data, 'heroImageUrl') || defaultHero.heroImageUrl,
        heroImageAlt: readString(data, 'heroImageAlt') || defaultHero.heroImageAlt,
        ticketUrl: readString(data, 'ticketUrl') || defaultHero.ticketUrl,
        badgeText: readString(data, 'badgeText') || defaultHero.badgeText
      });
    },
    (error) => onError?.(error)
  );
}

export function subscribeAgendaEvents(
  onChange: (events: AgendaEvent[]) => void,
  onError?: (error: unknown) => void
): () => void {
  return onSnapshot(
    query(collection(db, 'agendaEvents'), orderBy('date', 'asc')),
    (snapshot) => {
      onChange(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            date: readString(data, 'date'),
            title: readString(data, 'title'),
            info: readString(data, 'info'),
            lieu: readString(data, 'lieu'),
            adresse: readString(data, 'adresse'),
            heure: readString(data, 'heure'),
            billetterie: readString(data, 'billetterie'),
            createdAt: data['createdAt']
          } satisfies AgendaEvent;
        })
      );
    },
    (error) => onError?.(error)
  );
}

export function subscribeAlbumsWithPhotos(
  onChange: (albums: AlbumWithPhotos[]) => void,
  onError?: (error: unknown) => void
): () => void {
  let albums: Album[] = [];
  let photosByAlbum = new Map<string, AlbumPhoto[]>();
  const photoListeners = new Map<string, () => void>();

  const emit = () => {
    const merged = albums.map((album) => ({
      ...album,
      photos: photosByAlbum.get(album.id) ?? []
    }));

    onChange(merged);
  };

  const syncPhotoListeners = () => {
    const albumIds = new Set(albums.map((album) => album.id));

    // Remove listeners for deleted albums.
    photoListeners.forEach((unsubscribe, albumId) => {
      if (!albumIds.has(albumId)) {
        unsubscribe();
        photoListeners.delete(albumId);
        photosByAlbum.delete(albumId);
      }
    });

    // Create listeners for new albums.
    albums.forEach((album) => {
      if (photoListeners.has(album.id)) return;

      const unsubscribe = onSnapshot(
        query(collection(db, 'albums', album.id, 'photos'), orderBy('createdAt', 'asc')),
        (snapshot) => {
          const photos = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              imageUrl: readString(data, 'imageUrl'),
              caption: readString(data, 'caption'),
              createdAt: data['createdAt']
            } satisfies AlbumPhoto;
          });

          photosByAlbum.set(album.id, photos);
          emit();
        },
        (error) => onError?.(error)
      );

      photoListeners.set(album.id, unsubscribe);
    });
  };

  const unsubscribeAlbums = onSnapshot(
    query(collection(db, 'albums'), orderBy('createdAt', 'desc')),
    (snapshot) => {
      albums = snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: readString(data, 'title'),
          date: readString(data, 'date'),
          description: readString(data, 'description') || 'Souvenirs du spectacle',
          coverUrl: readString(data, 'coverUrl') || 'assets/background.png',
          createdAt: data['createdAt']
        } satisfies Album;
      });

      const albumIds = new Set(albums.map((album) => album.id));
      photosByAlbum = new Map(
        Array.from(photosByAlbum.entries()).filter(([albumId]) => albumIds.has(albumId))
      );

      syncPhotoListeners();
      emit();
    },
    (error) => onError?.(error)
  );

  return () => {
    unsubscribeAlbums();
    photoListeners.forEach((unsubscribe) => unsubscribe());
    photoListeners.clear();
  };
}

export function subscribeContactRequests(
  onChange: (items: ContactRequest[]) => void,
  onError?: (error: unknown) => void
): () => void {
  return onSnapshot(
    query(collection(db, 'contactRequests'), orderBy('createdAt', 'desc')),
    (snapshot) => {
      onChange(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            societe: readString(data, 'societe'),
            nom: readString(data, 'nom'),
            email: readString(data, 'email'),
            service: readString(data, 'service'),
            details: readString(data, 'details'),
            consent: data['consent'] === true,
            createdAt: data['createdAt']
          } satisfies ContactRequest;
        })
      );
    },
    (error) => onError?.(error)
  );
}

export function subscribeNewsletterSubscribers(
  onChange: (items: NewsletterSubscriber[]) => void,
  onError?: (error: unknown) => void
): () => void {
  return onSnapshot(
    query(collection(db, 'newsletter'), orderBy('createdAt', 'desc')),
    (snapshot) => {
      onChange(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            nom: readString(data, 'nom'),
            prenom: readString(data, 'prenom'),
            departement: readString(data, 'departement'),
            email: readString(data, 'email'),
            telephone: readString(data, 'telephone'),
            createdAt: data['createdAt']
          } satisfies NewsletterSubscriber;
        })
      );
    },
    (error) => onError?.(error)
  );
}
