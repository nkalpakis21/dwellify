'use client';  // Ensure this is a client-side component because we're using Firebase authentication

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';
import { logout } from '../lib/firebaseClient';


const LogoutPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait until loading is finished

    // Logout the user
    const performLogout = async () => {
      try {
        await logout();  // Call the logout function
        console.log('Logged out successfully');
        router.push('/login'); // Redirect to login page after logout
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    if (user) {
      performLogout(); // Perform logout if user is logged in
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>  {/* Optionally, display a loading message */}
    </div>
  );
};

export default LogoutPage;
