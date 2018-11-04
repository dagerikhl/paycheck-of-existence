import { firebaseDatabase } from './firebase';

const databaseRef = firebaseDatabase.ref();

const hoursRef = databaseRef.child('hours');

export const database = {
    hoursRef
};
