"use client";
import React, { useEffect, useState } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/footer";

export default function Home() {
  const [postcode, setPostcode] = useState("DH4 5QZ");
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const fetchRestaurants = async (postcode: string) => {
    setLoading(true); 
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants?postcode=${postcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setData(json);
      console.log("API Response:", json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchRestaurants(postcode);
    console.log("Postcode changed:", postcode);
  }, [postcode]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Waiting for data...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="text-white fixed top-0 left-0 w-full z-10 h-[4rem] flex items-center">
        <Header postcode={postcode} setPostcode={setPostcode} />
      </header>

      <main className="flex-1 overflow-y-auto mt-[4rem] mb-[4rem]">
        {data?.restaurants?.length > 0 ? (
          <Body data={data.restaurants} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-bold text-gray-700">No restaurants found for the selected postcode.</p>
          </div>
        )}
      </main>

      <footer className="text-white fixed bottom-0 left-0 w-full z-10 h-[4rem] flex items-center">
        <Footer data={data} />
      </footer>
    </div>
  );
}