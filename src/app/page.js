"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedMakeId, setSelectedMakeId] = useState(0);
  const [modelYears, setModelYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`,
        );
        const data = await response.json();
        if (Array.isArray(data.Results)) {
          setMakes(data.Results);
          console.log(data.Results);
        } else {
          throw new Error("Error");
        }
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const currentYear = 2024;
    const years = [];
    for (let year = currentYear; year >= 2015; year--) {
      years.push(year);
    }
    setModelYears(years);
  }, []);

  const handleMakeChange = (event) => {
    const selectedOption = makes.find(
      (make) => make.MakeName === event.target.value,
    );
    setSelectedMake(event.target.value);
    setSelectedMakeId(selectedOption ? selectedOption.MakeId : null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const isNextButtonEnabled = selectedMakeId !== null && selectedYear;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Select Vehicle Make and Model Year</h1>

      <div>
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Make
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={handleMakeChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a vehicle make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeName}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Model Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a model year</option>
          {modelYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Link href={`/result/${selectedMakeId}/${selectedYear}`} passHref>
          <button
            disabled={!isNextButtonEnabled}
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md 
                            ${isNextButtonEnabled ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"}`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
