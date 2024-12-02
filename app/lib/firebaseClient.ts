import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

type FirestoreData = Record<string, any>; // Replace with more specific types if you know the structure
export const SESSIONS_COLLECTION = 'sessions'
export type FormData = {
    full_name: string;
    email: string;
    phone_number: string;
    employer_name: string;
    monthly_income: number;
    current_address: string;
    credit_check_passed?: boolean;
    evicted_status?: string;
    criminal_record_status?: string;
    move_in_date?: string | null;
};

// Initialize Firebase
export const initializeFirebase = () => {
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');

    // Get Firestore instance
    const db = getFirestore(app);

    // Initialize Analytics if running in the browser
    if (typeof window !== 'undefined') {
        const analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized successfully');
    } else {
        console.log('Firebase Analytics not initialized (server-side)');
    }

    // Return Firestore DB instance for use in other parts of the app
    return db;
};

// Function to add a document to a Firestore collection
export const addDocumentToFirestore = async (collectionName: string, data: FirestoreData): Promise<void> => {
    const db = initializeFirebase();
    try {
        // Add a new document to the specified collection
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};
