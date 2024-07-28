"use client";

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

interface Shipment {
  _id: string;
  trackingId: string;
  company: string;
  destination: string;
  weight: number;
  status?: string;
}

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [company, setCompany] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const addShipment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    if (typeof weight !== 'number' || weight <= 0) {
      setError('Weight must be a positive number');
      return;
    }

    const shipmentData = { company, destination, weight };

    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        body: JSON.stringify(shipmentData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to add shipment: ${response.statusText}`);
      }

      const newShipment: Shipment = await response.json();
      setShipments([...shipments, newShipment]);
      setCompany('');
      setDestination('');
      setWeight('');
    } catch (error) {
      console.error('Error adding shipment:', error);
      setError('Failed to add shipment');
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    } else {
      console.log('Clipboard API not available');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Menu Bar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">Trident Inc.</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            </li>
            <li>
              <a href="/track" className="text-gray-300 hover:text-white transition-colors">Track Shipment</a>
            </li>
          </ul>
        </div>
      </nav>
  
      <div className="flex flex-1">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 p-6 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-200 text-center">Fill Shipment Details</h1>
            <form onSubmit={addShipment} className="space-y-4">
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="border border-gray-600 bg-gray-700 p-4 rounded-lg w-full text-gray-200 placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                className="border border-gray-600 bg-gray-700 p-4 rounded-lg w-full text-gray-200 placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                required
                className="border border-gray-600 bg-gray-700 p-4 rounded-lg w-full text-gray-200 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white p-4 rounded-lg w-full hover:bg-blue-800 transition-colors"
              >
                Add Shipment
              </button>
            </form>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          </div>
        </div>
  
        {/* Shipments List Section */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 flex-1">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">Shipments Record</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tracking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {shipments.map((shipment) => (
                    <tr key={shipment.trackingId}>
                      <td className="px-6 py-4 text-sm text-gray-200">{shipment.trackingId}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{shipment.company}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{shipment.destination}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{shipment.weight} kg</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{shipment.status || 'Pending'}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">
                        <button
                          onClick={() => copyToClipboard(shipment.trackingId)}
                          className="text-blue-400 hover:text-blue-500 transition-colors"
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
