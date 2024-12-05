// firestoreClient.ts
import { collection, addDoc } from 'firebase/firestore';
import { initializeFirebase } from './firebaseClient';

const SESSIONS_COLLECTION = 'sessions';

export const addDocumentToFirestore = async (collectionName: string, data: Record<string, unknown>): Promise<void> => {
    const { db } = initializeFirebase(); // Reuse the Firestore instance
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

export const addSessionWithRandomHash = async (data: FormData): Promise<string> => {
    const sessionIdHash = Math.random().toString(36).substring(2, 15); // Generates a random hash
    const sessionData = { ...data, session_id: sessionIdHash };
    await addDocumentToFirestore(SESSIONS_COLLECTION, sessionData);
    console.log('Session added with session_id:', sessionData.session_id);
    return sessionIdHash;
};
