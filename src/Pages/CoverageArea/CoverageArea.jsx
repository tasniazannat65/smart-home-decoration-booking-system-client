import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useLoaderData } from "react-router";
import Container from "../../Components/Shared/Container/Container";
import Heading from "../../Components/Shared/Heading/Heading";

const CoverageArea = () => {
  const servicesArea = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const location = formData.get("location").toLowerCase();
    const matchedService = servicesArea.find((service) =>
      service.locations.some((loc) => loc.city.toLowerCase().includes(location))
    );
    if (!matchedService) return;
    const findLocation = matchedService.locations.find((loc) =>
      loc.city.toLowerCase().includes(location)
    );
    if (findLocation && mapRef.current) {
      mapRef.current.flyTo([findLocation.lat, findLocation.lng], 14);
    }
  };

  return (
    <div className="my-16">
      <title>Laxius Decor || Coverage Area</title>
      <Container>
        <div className="max-w-4xl mx-auto">
          <Heading
            title="Search Service Availability"
            subtitle="Enter a city or area to check if we cover your location."
            center
          />
        </div>
        <div className="my-8 flex flex-col justify-center items-center">
          <form onSubmit={handleSearch}>
            <div className="relative w-[350px] md:w-[400px] lg:w-[480px] bg-gray-100 rounded-2xl shadow-md p-1 hover:shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-neutral opacity-70"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="location"
                className="w-full pl-8 pr-24 py-3 text-base text-accent bg-transparent rounded-lg focus:outline-none"
                placeholder="Search your location..."
              />
              <button className="absolute right-1 top-1 bottom-1 px-6 bg-primary text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32]">
                Search
              </button>
            </div>
          </form>
        </div>
      </Container>
      <div className=" w-full h-[800px] ">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {servicesArea.map((service, i) =>
            service?.locations.map((loc, index) => {
              if (typeof loc.lat === "number" && typeof loc.lng === "number") {
                return (
                  <Marker
                    key={`${service.service_name} - ${i} - ${index}`}
                    position={[loc.lat, loc.lng]}
                  >
                    <Popup>
                      <strong>{service.service_name}</strong> <br />
                      {loc.city}
                    </Popup>
                  </Marker>
                );
              }
            })
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageArea;
