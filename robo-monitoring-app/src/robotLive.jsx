import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

export default function LiveRoboLocation({ coordinates }) {
    return (
        <MapContainer center={coordinates} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <Marker position={coordinates} icon={L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            })}>
                <Popup>Robot Location: {coordinates.join(", ")}</Popup>
            </Marker>
        </MapContainer>
    );
}
