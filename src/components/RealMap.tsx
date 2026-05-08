"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="relative w-6 h-6 bg-sona rounded-full border-2 border-white shadow-[0_0_20px_rgba(197,151,58,1)] animate-pulse">
          <div class="absolute inset-0 rounded-full animate-ping bg-sona opacity-20"></div>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const cities = [
  { name: "Mumbai", count: 142, coords: [19.0760, 72.8777] },
  { name: "Delhi", count: 86, coords: [28.6139, 77.2090] },
  { name: "Bangalore", count: 64, coords: [12.9716, 77.5946] },
  { name: "Hyderabad", count: 52, coords: [17.3850, 78.4867] },
  { name: "Goa", count: 38, coords: [15.2993, 74.1240] },
  { name: "Jaipur", count: 24, coords: [26.9124, 75.7873] },
  { name: "Kolkata", count: 27, coords: [22.5726, 88.3639] },
  { name: "Chennai", count: 42, coords: [13.0827, 80.2707] },
];

function CustomZoomControl() {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-right mt-6! mr-6!">
      <div className="leaflet-control flex flex-col space-y-2 border-none! bg-transparent!">
        <button 
          onClick={() => map.zoomIn()}
          className="w-10 h-10 bg-raat/90 backdrop-blur-md border border-sona/30 rounded-full flex items-center justify-center text-sona text-2xl hover:bg-sona hover:text-raat transition-all shadow-xl"
        >
          +
        </button>
        <button 
          onClick={() => map.zoomOut()}
          className="w-10 h-10 bg-raat/90 backdrop-blur-md border border-sona/30 rounded-full flex items-center justify-center text-sona text-2xl hover:bg-sona hover:text-raat transition-all shadow-xl"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default function RealMap() {
  const [geoJsonData, setGeoJsonData] = useState<object | null>(null);

  useEffect(() => {
    // Fetching official-aligned India States GeoJSON
    fetch("https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/india/states/india_states.json")
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error("Error loading India States GeoJSON:", err));
  }, []);

  return (
    <div className="w-full h-full relative group overflow-hidden">
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={4.5}
        scrollWheelZoom={false}
        className="w-full h-full bg-raat"
        zoomControl={false}
        style={{ position: 'relative' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />

        {geoJsonData && (
          <GeoJSON 
            data={geoJsonData as { type: "FeatureCollection" }} 
            style={{
              color: "#C5973A", // Gold boundaries
              weight: 1,
              fillColor: "#1A1814",
              fillOpacity: 0.4,
              opacity: 0.6
            }}
            onEachFeature={(feature, layer) => {
              if (feature.properties && feature.properties.ST_NM) {
                layer.bindTooltip(feature.properties.ST_NM, {
                  permanent: false,
                  direction: "center",
                  className: "state-label"
                });
              }
            }}
          />
        )}
        
        {/* Layer for City Labels only */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
        />
        
        <CustomZoomControl />
        
        {/* Luxury Map Styling */}
        <style jsx global>{`
          .leaflet-container {
            background: #0A0A08 !important;
          }
          .state-label {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: rgba(237, 232, 223, 0.4) !important;
            font-family: var(--font-serif) !important;
            font-size: 10px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.1em !important;
            pointer-events: none !important;
          }
          
          /* Luxury Popup Animation */
          .luxury-popup .leaflet-popup-content-wrapper {
            background: rgba(10, 10, 8, 0.85) !important;
            backdrop-filter: blur(12px);
            color: #F7F0E3;
            border: 1px solid rgba(197, 151, 58, 0.3);
            border-radius: 2px;
            padding: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }
          .luxury-popup .leaflet-popup-tip {
            background: rgba(10, 10, 8, 0.85);
            border: 1px solid rgba(197, 151, 58, 0.3);
          }
          
          .leaflet-popup {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          
          .leaflet-popup.leaflet-zoom-animated {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        `}</style>

        {cities.map((city) => (
          <Marker 
            key={city.name} 
            position={city.coords as [number, number]} 
            icon={DefaultIcon}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              }
            }}
          >
            <Popup className="luxury-popup" closeButton={false} autoPan={false}>
              <div className="text-center p-2 min-w-[120px]">
                <p className="text-sona text-[8px] uppercase tracking-[0.3em] mb-1">{city.name}</p>
                <p className="text-lg font-serif tracking-tight">{city.count}</p>
                <p className="text-[8px] uppercase tracking-widest opacity-40">Portfolio Assets</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
