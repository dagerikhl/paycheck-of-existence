import { firebaseAuth } from '../firebase/firebase';
import { AuthUser } from '../interfaces/AuthUser';
import { Error } from '../interfaces/Error';

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
