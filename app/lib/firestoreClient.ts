import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { IProperty, IPropertyFormRequest } from '../types/property';
import { initializeFirebase } from './firebaseClient';
import { serverTimestamp } from 'firebase/firestore'
import { IApplication, IFeedbackFormRequest } from '../types/application';

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

export const addSessionWithRandomHash = async (appplication: IApplication): Promise<string> => {
    const sessionIdHash = Math.random().toString(36).substring(2, 15); // Generates a random hash
    const sessionData = { ...appplication, session_id: sessionIdHash };
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

export const getApplicationByRefId = async (refId: string): Promise<IApplication[]> => {
    const { db } = initializeFirebase();
    try {
        // Query Firestore to get applications where propertyId matches
        const sessionsRef = collection(db, SESSIONS_COLLECTION);
        const q = query(sessionsRef, where('refId', '==', refId));
        const querySnapshot = await getDocs(q);

        // Check if there are any documents
        if (querySnapshot.empty) {
            return [];
        }

        // Map the documents to an array of properties
        const applications: IApplication[] = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IApplication; // Assuming the document data matches your IProperty structure
        });

        return applications;
    } catch (error) {
        console.error('Error getting properties by userId:', error);
        throw new Error('Failed to retrieve properties');
    }
}

export const getApplicationsByUser = async (userId: string): Promise<IApplication[]> => {
    const { db } = initializeFirebase();
    try {
        // Query Firestore to get applications where propertyId matches
        const sessionsRef = collection(db, SESSIONS_COLLECTION);
        const q = query(sessionsRef, where('refId', '==', userId));
        const querySnapshot = await getDocs(q);

        // Check if there are any documents
        if (querySnapshot.empty) {
            return [];
        }

        // Map the documents to an array of properties
        const applications: IApplication[] = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IApplication; // Assuming the document data matches your IProperty structure
        });

        return applications;
    } catch (error) {
        console.error('Error getting properties by userId:', error);
        throw new Error('Failed to retrieve properties');
    }
}
// Function to get all applications by userId
export const getApplicationsByProperty = async (propertyId: string): Promise<IApplication[]> => {
    const { db } = initializeFirebase();
    try {
        // Query Firestore to get applications where propertyId matches
        const sessionsRef = collection(db, SESSIONS_COLLECTION);
        const q = query(sessionsRef, where('refId', '==', propertyId));
        const querySnapshot = await getDocs(q);

        // Check if there are any documents
        if (querySnapshot.empty) {
            return [];
        }

        // Map the documents to an array of properties
        const applications: IApplication[] = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IApplication; // Assuming the document data matches your IProperty structure
        });

        return applications;
    } catch (error) {
        console.error('Error getting properties by userId:', error);
        throw new Error('Failed to retrieve properties');
    }
}

/**
 * Fetches an application from Firestore by its ID.
 * @param {string} appId - The ID of the application document.
 * @returns {Promise<Object>} - The application data, or null if not found.
 */
export const getApplicationById = async (applicationId: string): Promise<IApplication | null> => {
    const { db } = initializeFirebase();
    
    try {
        const applicationsRef = collection(db, SESSIONS_COLLECTION); // Reference to applications collection
        const applicationDoc = doc(applicationsRef, applicationId); // Reference to the specific document
        const applicationSnapshot = await getDoc(applicationDoc); // Fetch the document snapshot

        // Check if the document exists
        if (!applicationSnapshot.exists()) {
            console.log('Application not found');
            return null;
        }

        // Return the application data as an IApplication object
        return {
            id: applicationSnapshot.id,
            ...applicationSnapshot.data(),
        } as unknown as IApplication;
        
    } catch (error) {
        console.error('Error fetching application by ID:', error);
        throw new Error('Failed to retrieve application');
    }
};

/**
 * Adds a feedback document to the feedback collection in Firestore.
 * @param feedbackRequest - The feedback request data.
 * @returns A Promise<void> indicating the operation is complete.
 */
// Firestore function to add feedback using helper function
export const addFeedback = async (feedbackRequest: IFeedbackFormRequest): Promise<void> => {
    try {
      // Use the helper function to add the feedback to Firestore
      await addDocumentToFirestore('feedback', feedbackRequest);
      console.log('Feedback successfully added');
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw new Error('Failed to add feedback');
    }
  };

  /**
 * Fetches all feedback from the feedback collection.
 * @returns {Promise<IFeedbackFormRequest[]>} - A list of all feedback.
 */
export const getAllFeedback = async (): Promise<IFeedbackFormRequest[]> => {
    const { db } = initializeFirebase();
    
    try {
        const feedbackRef = collection(db, 'feedback');
        const feedbackSnapshot = await getDocs(feedbackRef);
        
        // If no documents exist
        if (feedbackSnapshot.empty) {
            return [];
        }

        // Map documents to feedback objects
        const feedbackList: IFeedbackFormRequest[] = feedbackSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IFeedbackFormRequest;
        });

        return feedbackList;
    } catch (error) {
        console.error('Error fetching all feedback:', error);
        throw new Error('Failed to retrieve feedback');
    }
};

/**
 * Fetches all feedback for a specific application.
 * @param {string} applicationId - The ID of the application.
 * @returns {Promise<IFeedbackFormRequest[]>} - A list of feedback related to the application.
 */
export const getFeedbackByApplication = async (applicationId: string): Promise<IFeedbackFormRequest[]> => {
    const { db } = initializeFirebase();
    
    try {
        const feedbackRef = collection(db, 'feedback');
        const q = query(feedbackRef, where('refId', '==', applicationId)); // Query feedback by application ID
        const feedbackSnapshot = await getDocs(q);

        // If no feedback exists for this application
        if (feedbackSnapshot.empty) {
            return [];
        }

        // Map documents to feedback objects
        const feedbackList: IFeedbackFormRequest[] = feedbackSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown as IFeedbackFormRequest;
        });

        return feedbackList;
    } catch (error) {
        console.error('Error fetching feedback for application:', error);
        throw new Error('Failed to retrieve feedback');
    }
};

/**
 * Fetches all feedback for a specific property by first fetching all applications,
 * and then retrieving feedback for each application.
 * @param {string} propertyId - The ID of the property.
 * @returns {Promise<IFeedbackFormRequest[]>} - A list of all feedback related to the property.
 */
export const getFeedbackByProperty = async (propertyId: string): Promise<IFeedbackFormRequest[]> => {
    
    try {
        // Step 1: Get all applications related to the property
        const applications = await getApplicationsByProperty(propertyId);

        if (applications.length === 0) {
            return [];
        }

        // Step 2: For each application, get related feedback
        const feedbackPromises = applications.map((application) =>
            getFeedbackByApplication(application.id)
        );

        // Resolve all feedback promises
        const allFeedback = await Promise.all(feedbackPromises);

        // Flatten the nested arrays of feedback
        const feedbackList = allFeedback.flat();

        return feedbackList;
    } catch (error) {
        console.error('Error fetching feedback for property:', error);
        throw new Error('Failed to retrieve feedback');
    }
};


