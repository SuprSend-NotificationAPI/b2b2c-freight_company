"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css'; // For toast notifications

const SuprSendInbox = dynamic(() => import('@suprsend/react-inbox'), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [endUserName, setEndUserName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [endUserEmail, setEndUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, endUserName, companyEmail, endUserEmail }),
      });

      if (!response.ok) {
        throw new Error(`Failed to login: ${response.statusText}`);
      }

      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login');
    }
  };

  // Ensure environment variables are defined
  const workspaceKey = process.env.NEXT_PUBLIC_SUPRSEND_WORKSPACE_KEY || '';
  const subscriberId = process.env.NEXT_PUBLIC_SUPRSEND_SUBSCRIBER_ID || '';
  const distinctId = process.env.NEXT_PUBLIC_SUPRSEND_DISTINCT_ID || '';

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* SuprSend Inbox */}
      <div className="fixed top-0 right-0 m-4 z-50">
        <SuprSendInbox
          workspaceKey={workspaceKey}
          subscriberId={subscriberId}
          distinctId={distinctId}
          themeType="dark"
        />
      </div>
      
      <div className="flex flex-col justify-center w-full md:w-2/3 lg:w-1/2 p-6 md:p-12 lg:p-16">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl transform transition-transform hover:scale-105">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-400">Welcome to The Trident Inc.</h1>
          <p className="text-xl mb-8">Your logistics solution for shipping packages worldwide.</p>
          <div className="flex space-x-6">
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                Dashboard
              </button>
            </Link>
            <Link href="/track">
              <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                Track Shipment
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/3 lg:w-1/2 bg-gray-800 p-6 md:p-12 lg:p-16 rounded-l-2xl shadow-2xl">
        <div className="bg-gray-700 p-10 rounded-2xl shadow-md transform transition-transform hover:scale-105">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-300">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-400 text-lg">{error}</p>}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">Shipping Company Name</label>
              <select
                className="block w-full p-4 rounded-lg bg-gray-600 border border-gray-500 text-white focus:border-blue-500 focus:outline-none transition-colors"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              >
                <option value="" disabled>Choose any Company</option>
                <option value="Company A">Bluestar Logistics</option>
                <option value="Company B">Marinetime Logistics</option>
                <option value="Company C">FDX Corp</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">End-user Name</label>
              <select
                className="block w-full p-4 rounded-lg bg-gray-600 border border-gray-500 text-white focus:border-blue-500 focus:outline-none transition-colors"
                value={endUserName}
                onChange={(e) => setEndUserName(e.target.value)}
              >
                <option value="" disabled>Choose any End-user</option>
                <option value="User A">Oliver Smith</option>
                <option value="User B">Rust Cohle</option>
                <option value="User C">Martin Jane</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">Shipping Company Email</label>
              <input
                type="email"
                className="block w-full p-4 rounded-lg bg-gray-600 border border-gray-500 text-white focus:border-blue-500 focus:outline-none transition-colors"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">End-user Email</label>
              <input
                type="email"
                className="block w-full p-4 rounded-lg bg-gray-600 border border-gray-500 text-white focus:border-blue-500 focus:outline-none transition-colors"
                value={endUserEmail}
                onChange={(e) => setEndUserEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>  
    </div>
  );
}
