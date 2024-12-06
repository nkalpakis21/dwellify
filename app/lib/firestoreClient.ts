// firestoreClient.ts
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { IProperty, IPropertyFormRequest } from '../types/property';
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

export const addProperty = async (data: IPropertyFormRequest): Promise<void> => {
    const propertyData = {...data, price: Number(data.price),
        images: [] // Add image upload functionality later
    }
    await addDocumentToFirestore(PROPERTIES_COLLECTION, propertyData);
    return;
};

// Function to get all properties by userId
export const getPropertiesByUser = async (userId: string): Promise<IProperty[]> => {
    const { db } = initializeFirebase();
    try {
        // Query Firestore to get properties where userId matches
        const propertiesRef = collection(db, PROPERTIES_COLLECTION);
        const q = query(propertiesRef, where('listedBy', '==', userId)); // Replace 'userId' with 'listedBy' for consistency
        const querySnapshot = await getDocs(q);

        // Check if there are any documents
        if (querySnapshot.empty) {
            return [];
        }

        // Map the documents to an array of properties
        const properties: IProperty[] = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IProperty; // Assuming the document data matches your IProperty structure
        });

        return properties;
    } catch (error) {
        console.error('Error getting properties by userId:', error);
        throw new Error('Failed to retrieve properties');
    }
};