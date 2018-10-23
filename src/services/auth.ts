import { AuthUser } from '../constants/interfaces/AuthUser';
import { Error } from '../constants/interfaces/Error';
import { firebaseAuth } from './firebase';

const login = (email: string, password: string) => firebaseAuth.signInWithEmailAndPassword(email, password);
const logout = () => firebaseAuth.signOut();
const onAuthUserUpdate =
    (next: ((a: AuthUser | null) => any), error?: (a: Error) => any, completed?: () => void): () => void =>
        firebaseAuth.onAuthStateChanged(next, error, completed);

export const auth = {
    login,
    logout,
    onAuthUserUpdate
};
