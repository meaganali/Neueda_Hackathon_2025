"use client";

import { useState, useEffect } from "react";
import { getAllCharities } from "@/lib/astradb";

export default function TestAstraPage() {
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching charities...");
        const data = await getAllCharities();
        console.log("Charities fetched:", data);
        setCharities(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching charities:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AstraDB Connection Test</h1>
      
      {loading && <p className="text-gray-600">Loading charities data...</p>}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="mt-2">Using mock client as fallback.</p>
        </div>
      )}
      
      {!loading && charities.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Found {charities.length} Charities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities.map((charity) => (
              <div key={charity.id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold">{charity.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{charity.category}</p>
                <p className="mb-2">{charity.description}</p>
                <div className="mt-auto">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {charity.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && charities.length === 0 && !error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>No charities found in the database.</p>
        </div>
      )}
    </div>
  );
}
