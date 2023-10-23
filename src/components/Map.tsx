import React from 'react'
import { GoogleMap, Polyline, useJsApiLoader } from '@react-google-maps/api';
import Ship from './Ship';

export interface GCoor {
    lat: number;
    lng: number;
}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 0.7893,
  lng: 113.9213
};

const Map: React.FC<{coors: GCoor[]}> = ({coors}) => {
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS_KEY as string
    });

    //Polyline untuk gambar jalur kapal
    //Ships untuk coordinate kapal
    return isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5.5}
            >
                { /* Component untuk kapal dan jalurnya*/ }
                <Ship coors={coors}/>
                <Polyline options={{path: coors, strokeColor: 'red'}}></Polyline>
            <></>
            </GoogleMap>
        ) : <></>
}

export default React.memo(Map);