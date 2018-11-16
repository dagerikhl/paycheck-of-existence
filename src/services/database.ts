import { firebaseDatabase } from './firebase';

const databaseRef = firebaseDatabase.ref();

const getUserRef = (userId: string) => databaseRef.child('users').child(userId);

export const database = {
    getUserRef
};
