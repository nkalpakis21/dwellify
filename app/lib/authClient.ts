// authClient.ts
import { initializeFirebase } from './firebaseClient';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const loginWithEmail = async (email: string, password: string): Promise<void> => {
    const { auth } = initializeFirebase();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully');
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const registerWithEmail = async (email: string, password: string): Promise<void> => {
    const { auth } = initializeFirebase();

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully');
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    const { auth } = initializeFirebase();
    try {
        await signOut(auth);
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};
