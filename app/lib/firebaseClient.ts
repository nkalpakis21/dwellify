import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Firestore collection name
export const SESSIONS_COLLECTION = 'sessions';

// Types for form data
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

export type FormDataModel = FormData & { session_id: string };

// Firebase App instance
let firebaseApp: FirebaseApp | null = null; // Firebase App
let db: Firestore | null = null; // Firestore
let auth: Auth | null = null; // Firebase Auth

// Initialize Firebase function (singleton pattern)
export const initializeFirebase = (): { db: Firestore; auth: Auth } => {
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

        // Initialize Firebase Auth first
        auth = getAuth(firebaseApp);
        console.log('Firebase Auth initialized');
        setPersistence(auth, browserLocalPersistence);  // Add this line to set persistence mode

        // Initialize Firestore only after Auth
        db = getFirestore(firebaseApp);
        console.log('Firestore initialized');
    }

    // Ensure Firestore and Auth are initialized
    if (!db || !auth) {
        throw new Error('Firebase Firestore or Auth not initialized.');
    }

    return { db, auth };
};

// Function to add a document to a Firestore collection
export const addDocumentToFirestore = async (collectionName: string, data: Record<string, unknown>): Promise<void> => {
    const { db } = initializeFirebase(); // Reuse the Firestore instance
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

// Firebase Authentication Functions
export const loginWithEmail = async (email: string, password: string): Promise<void> => {
    const { auth } = initializeFirebase(); // Reuse the Auth instance
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully');
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const registerWithEmail = async (email: string, password: string): Promise<void> => {
    const { auth } = initializeFirebase(); // Reuse the Auth instance
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully');
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    const { auth } = initializeFirebase(); // Reuse the Auth instance
    try {
        await signOut(auth);
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};

export { auth };
