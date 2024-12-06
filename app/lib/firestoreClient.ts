// firestoreClient.ts
import { collection, addDoc } from 'firebase/firestore';
import { IPropertyForm } from '../types/property';
import { initializeFirebase } from './firebaseClient';
import { serverTimestamp } from 'firebase/firestore'

const SESSIONS_COLLECTION = 'sessions';
const PROPERTIES_COLLECTION = 'properties';

export const addDocumentToFirestore = async (collectionName: string, data: Record<string, unknown>): Promise<void> => {
    const { db } = initializeFirebase(); // Reuse the Firestore instance
    try {
        const dbData = {
            ...data, 
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
        const docRef = await addDoc(collection(db, collectionName), dbData);
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

export const addProperty = async (data: IPropertyForm): Promise<void> => {
    const propertyData = {...data, price: Number(data.price),
        listedBy: 'userId', // Replace with actual user ID when auth is implemented
        images: [] // Add image upload functionality later
    }
    await addDocumentToFirestore(PROPERTIES_COLLECTION, propertyData);
    return;
};