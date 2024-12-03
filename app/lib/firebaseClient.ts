import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, Firestore, collection, addDoc } from 'firebase/firestore';
// @ts-ignore: Ignoring the use of 'any' type for FirestoreData
type FirestoreData = Record<string, any>; // Replace with more specific types if you know the structure
export const SESSIONS_COLLECTION = 'sessions';

export type FormData = {
    full_name: string;
    email: string;
    phone_number: string;
    employer_name: string;
    current_rent: number;
    reason_for_moving: string;
    monthly_income: number;
    current_address: string;
    credit_check_passed: boolean;
    evicted_status: string;
    criminal_record_status: string;
    move_in_date: string;
};

let firebaseApp: FirebaseApp | null = null; // Singleton instance of Firebase App
let db: Firestore | null = null; // Singleton instance of Firestore

// Initialize Firebase function with singleton pattern
export const initializeFirebase = (): Firestore => {
    // Check if Firebase is already initialized
    if (!firebaseApp) {
        console.log('Initializing Firebase...');

        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        };

        // Initialize Firebase app
        firebaseApp = initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');

        // Get Firestore instance (singleton)
        db = getFirestore(firebaseApp);

        // Initialize Analytics if running in the browser
        if (typeof window !== 'undefined') {
            // const analytics: Analytics = getAnalytics(firebaseApp);
            console.log('Firebase Analytics initialized successfully');
        } else {
            console.log('Firebase Analytics not initialized (server-side)');
        }
    }

    // Return the Firestore instance (singleton)
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }
    return db;
};

// Function to add a document to a Firestore collection
export const addDocumentToFirestore = async (collectionName: string, data: FirestoreData): Promise<void> => {
    const db = initializeFirebase(); // Reuse the Firestore instance
    try {
        // Add a new document to the specified collection
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

// Function to add a session document with session_id (random hash)
export const addSessionWithRandomHash = async (data: FormData): Promise<string> => {
    const sessionIdHash = generateRandomHash();
    const sessionData = { ...data, session_id: sessionIdHash };

    await addDocumentToFirestore(SESSIONS_COLLECTION, sessionData);
    console.log('Session added with session_id:', sessionData.session_id);
    return sessionIdHash;
};

// Helper function to generate a random hash (could be a UUID or a random string)
export const generateRandomHash = (): string => {
    return Math.random().toString(36).substring(2, 15); // Generates a random alphanumeric string
};
