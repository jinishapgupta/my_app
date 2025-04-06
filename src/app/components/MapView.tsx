import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Card from "./RestaurantCards/Card"; // Import your Card component
import MapCardPortal from "./MapCardPortal"; // Import the portal

interface MapViewProps {
  restaurants: any[];
}

export default function MapView({ restaurants }: MapViewProps) {
  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="w-full h-full rounded-md shadow-md z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {restaurants.map((restaurant, index) => {
          const [longitude, latitude] = restaurant.location?.coordinates || [-0.09, 51.505];
          const markerId = `marker-${index}`;

          const customIcon = L.divIcon({
            className: "custom-marker",
            html: `<div id="${markerId}" style="width: 220px; height: auto;"></div>`,
          });

          return (
            <Marker
              key={index}
              position={[latitude, longitude]}
              icon={customIcon}
            >
              <MapCardPortal markerId={markerId}>
                <div className="transform -translate-x-1/2 -translate-y-full z-[1000]">
                  <Card restaurant={restaurant} />
                </div>
              </MapCardPortal>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
