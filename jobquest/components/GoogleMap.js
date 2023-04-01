"use client";
import { use } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

export default function GoogleMap({ address }) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY;
    Geocode.setApiKey(API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("sg");

    let addressData = null;

    addressData = use(
        Geocode.fromAddress(address)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return null;
            })
    );

    if (!addressData) {
        return <div>Address not found</div>;
    }

    const centerLat = addressData.results[0].geometry.location.lat;
    const centerLng = addressData.results[0].geometry.location.lng;
    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: centerLat, lng: centerLng },
            map,
            title: "Job Address",
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
            defaultZoom={15}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
    );
}
