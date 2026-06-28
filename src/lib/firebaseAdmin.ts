import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseApp } from './firebase';

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);