"use client";
import { use } from "react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

export default function GoogleMap({ address }) {
    const API_KEY = "AIzaSyBqF2K8FAS7mCf7bllWctWTZDeR538n5bY";
    Geocode.setApiKey(API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("sg");
    const addressData = use(Geocode.fromAddress(address));
    const centerLat = addressData.results[0].geometry.location.lat;
    const centerLng = addressData.results[0].geometry.location.lng;
    const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
        position: { lat: centerLat, lng: centerLng },
        map,
        title: 'Job Location'
        });
        return marker;
    };

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: API_KEY,
            }}
            defaultCenter={{
                lat: centerLat,
                lng: centerLng,
            }}
            defaultZoom={20}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
        </GoogleMapReact>
    );
}
