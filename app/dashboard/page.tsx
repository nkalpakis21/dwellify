'use client';
import { useAuth } from '../lib/AuthContext';

export default function Dashboard() {
    const {user} = useAuth();
    console.log(user);

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}
