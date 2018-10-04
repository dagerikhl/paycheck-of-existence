import { firebaseAuth } from '../firebase/firebase';

export const login = firebaseAuth.signInWithEmailAndPassword;
export const logout = firebaseAuth.signOut;
