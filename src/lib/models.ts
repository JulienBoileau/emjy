export interface HomeHeroContent {
  heroImageUrl: string;
  heroImageAlt: string;
  ticketUrl: string;
  badgeText: string;
}

export interface AgendaEvent {
  id: string;
  date: string;
  title: string;
  info: string;
  lieu: string;
  adresse: string;
  heure: string;
  billetterie: string;
  createdAt?: unknown;
}

export interface AgendaEventInput {
  date: string;
  title: string;
  info: string;
  lieu: string;
  adresse: string;
  heure: string;
  billetterie: string;
}

export interface Album {
  id: string;
  title: string;
  date: string;
  description: string;
  coverUrl: string;
  createdAt?: unknown;
}

export interface AlbumInput {
  title: string;
  date: string;
  description: string;
  coverUrl: string;
}

export interface AlbumPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt?: unknown;
}

export interface AlbumWithPhotos extends Album {
  photos: AlbumPhoto[];
}

export interface ContactRequest {
  id: string;
  societe: string;
  nom: string;
  email: string;
  service: string;
  details: string;
  consent: boolean;
  createdAt?: unknown;
}

export interface NewsletterSubscriber {
  id: string;
  nom: string;
  prenom: string;
  departement: string;
  email: string;
  telephone: string;
  createdAt?: unknown;
}
