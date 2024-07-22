"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

interface Shipment {
  _id: string;
  company: string;
  destination: string;
  weight: number;
  trackingId: string;
  status: string;
  trackingDetails: { location: string; timestamp: string }[];
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState<string>('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string>('');

  const fetchShipment = async () => {
    try {
      const response = await fetch(`/api/track?trackingId=${trackingId}`);
      if (!response.ok) {
        throw new Error('Shipment not found');
      }
      const data: Shipment = await response.json();
      setShipment(data);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setShipment(null);
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Form Section */}
        <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Track Your Shipment</h1>
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID"
              className="border border-gray-600 p-4 rounded-lg w-full text-lg text-white bg-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
          <button
            onClick={fetchShipment}
            className="bg-blue-600 text-white p-4 rounded-lg w-full text-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Track Shipment
          </button>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          {shipment && (
            <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600 shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">Shipment Details</h2>
              <div className="space-y-2">
                <p className="text-white"><strong className="font-medium">Company:</strong> {shipment.company}</p>
                <p className="text-white"><strong className="font-medium">Destination:</strong> {shipment.destination}</p>
                <p className="text-white"><strong className="font-medium">Weight:</strong> {shipment.weight} kg</p>
                <p className="text-white"><strong className="font-medium">Tracking ID:</strong> {shipment.trackingId}</p>
                <p className="text-white"><strong className="font-medium">Status:</strong> {shipment.status}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tracking Details Section */}
        {shipment && shipment.trackingDetails && (
          <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">Tracking Details</h2>
            <div className="space-y-6">
              {shipment.trackingDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="text-blue-500">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                  </div>
                  <div className="text-white">
                    <p className="text-lg font-semibold">{detail.location}</p>
                    <p className="text-sm text-gray-400">
                      <FontAwesomeIcon icon={faClock} /> {new Date(detail.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
