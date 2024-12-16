import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Add this to ensure Leaflet styles are loaded

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function LiveRoboLocation({ coordinates }) {
    if (!coordinates || coordinates.length !== 2) {
        return <div>Invalid coordinates</div>;
    }

    return (
        <MapContainer
            center={coordinates}
            zoom={12}
            style={{"height": "200px", "width": "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates} icon={markerIcon}>
                <Popup>Robot Location: {coordinates.join(", ")}</Popup>
            </Marker>
        </MapContainer>
    );
}
