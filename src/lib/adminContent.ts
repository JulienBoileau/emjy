import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from './firebase';
import { storage } from './firebaseAdmin';
import type { AgendaEventInput, AlbumInput, HomeHeroContent } from './models';

export async function saveHomepageContent(content: HomeHeroContent): Promise<void> {
  await setDoc(
    doc(db, 'siteContent', 'homepage'),
    {
      ...content,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function addAgendaEvent(payload: AgendaEventInput): Promise<void> {
  await addDoc(collection(db, 'agendaEvents'), {
    ...payload,
    createdAt: serverTimestamp()
  });
}

export async function deleteAgendaEvent(eventId: string): Promise<void> {
  await deleteDoc(doc(db, 'agendaEvents', eventId));
}

export async function createAlbum(payload: AlbumInput): Promise<string> {
  const docRef = await addDoc(collection(db, 'albums'), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return docRef.id;
}

export async function deleteAlbum(albumId: string): Promise<void> {
  await deleteDoc(doc(db, 'albums', albumId));
}

export async function addAlbumPhoto(albumId: string, imageUrl: string, caption: string): Promise<void> {
  await addDoc(collection(db, 'albums', albumId, 'photos'), {
    imageUrl,
    caption,
    createdAt: serverTimestamp()
  });
}

export async function deleteAlbumPhoto(albumId: string, photoId: string): Promise<void> {
  await deleteDoc(doc(db, 'albums', albumId, 'photos', photoId));
}

export async function updateAlbumCover(albumId: string, coverUrl: string): Promise<void> {
  await setDoc(
    doc(db, 'albums', albumId),
    {
      coverUrl,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

async function uploadFile(file: File, path: string): Promise<string> {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}

export function uploadHomepageImage(file: File): Promise<string> {
  return uploadFile(file, `homepage/${Date.now()}-${file.name}`);
}

export function uploadAlbumCover(albumId: string, file: File): Promise<string> {
  return uploadFile(file, `albums/${albumId}/cover/${Date.now()}-${file.name}`);
}

export function uploadAlbumPhoto(albumId: string, file: File): Promise<string> {
  return uploadFile(file, `albums/${albumId}/photos/${Date.now()}-${file.name}`);
}

export async function deleteStorageFile(fileUrl: string): Promise<void> {
  if (!fileUrl.includes('firebasestorage')) {
    return;
  }

  await deleteObject(ref(storage, fileUrl));
}