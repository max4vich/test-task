"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const VehicleModels = () => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    if (slug && slug.length === 2) {
      const makeId = slug[0];
      const year = slug[1];

      const fetchModels = async () => {
        setLoading(true);
        try {
          const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setModels(data.Results || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchModels();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-red-600">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Vehicle Models for {slug[0]} in {slug[1]}
      </h1>
      <ul className="mt-4 space-y-2">
        {models.length > 0 ? (
          models.map((model) => (
            <li key={model.Model_Id} className="border p-2 rounded-md shadow">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No models found.</li>
        )}
      </ul>
    </div>
  );
};

export default VehicleModels;
