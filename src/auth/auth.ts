import { firebaseAuth } from '../firebase/firebase';

const login = (email: string, password: string) => firebaseAuth.signInWithEmailAndPassword(email, password);
const logout = () => firebaseAuth.signOut();

export const auth = {
    login,
    logout
};
