import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  type User
} from 'firebase/auth';
import { auth } from './firebaseAdmin';

export const allowedAdminEmails = new Set([
  'julien.boileau@kodium.fr',
  'contact@emjyproduction.com'
]);

export function isAllowedEmail(email: string | null | undefined): boolean {
  return !!email && allowedAdminEmails.has(email.toLowerCase());
}

export function subscribeAuth(onChange: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, onChange);
}

export async function signUpAdmin(email: string, password: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!allowedAdminEmails.has(normalizedEmail)) {
    throw new Error('Cet email n\'est pas autorise pour la creation du compte admin.');
  }

  const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);

  if (!isAllowedEmail(cred.user.email)) {
    await signOut(auth);
    throw new Error('Compte non autorise.');
  }

  await signOut(auth);
}

export async function signInAdmin(email: string, password: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!allowedAdminEmails.has(normalizedEmail)) {
    throw new Error('Cet email n\'est pas autorise pour l\'administration.');
  }

  const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);

  if (!isAllowedEmail(cred.user.email)) {
    await signOut(auth);
    throw new Error('Compte non autorise.');
  }
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  const currentUser = auth.currentUser;

  if (!currentUser?.email) {
    throw new Error('Session admin introuvable. Reconnecte-toi puis réessaie.');
  }

  const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
  await reauthenticateWithCredential(currentUser, credential);
  await updatePassword(currentUser, newPassword);
}
