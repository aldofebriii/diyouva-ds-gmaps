# Diyouva

Created: October 23, 2023 2:14 AM
Reviewed: No

# Docs

.env harus memuat dua variable berikut

```json
REACT_APP_GMAPS_KEY="YOUR_GMAPS_KEY"
REACT_APP_API_URL="YOUR_BASE_API_URL_WITHOUT_/ contoh: https://api.com"
```

### map.tsx

**Ship** mewakilkan satu kapal yang coordinatenya pindah.

**Polyline** akan ngegenarate garis jalur kapal.

```tsx
import React from 'react'
import { GoogleMap, Polyline, useJsApiLoader } from '@react-google-maps/api';
import Ship from './Ships';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 0.7893,
  lng: 113.9213
};

const Map: React.FC<{coors: google.maps.LatLng[] | google.maps.LatLngLiteral[]}> = ({coors}) => {
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
                zoom={6}
            >
                { /* Component untuk kapal dan jalurnya*/ }
                <Ship coors={coors}/>
                <Polyline options={{path: coors, strokeColor: 'red'}}></Polyline>
            <></>
            </GoogleMap>
        ) : <></>
}

export default React.memo(Map);
```

Untuk mengubah mengupdate map silahkan menggunakan method **************setMap**************

### Ship.tsx

```tsx
import { Marker } from "@react-google-maps/api";
import ShipIcon from "../icon/ShipIcon";

const Ship: React.FC<{coors: google.maps.LatLng[] | google.maps.LatLngLiteral[]}> = ({coors}) => {
    return <>
    {coors.map((c, idx) => {
        return <Marker key={idx} position={c} icon={ShipIcon()}/>
    })}
    </>
};

export default Ship;
```

Atur properti icon pada dir ****************icon/ShipIcon.ts****************

```tsx
const ShipIcon: () => google.maps.Icon = () => {
    const shipSize = new google.maps.Size(50,50);
    return {
        url: 'https://p1.hiclipart.com/preview/459/325/166/fishing-ship-boat-watercraft-fishing-vessel-sailing-ship-sailboat-cartoon-png-clipart.jpg',
        scaledSize: shipSize
    }
};

export default ShipIcon;
```

Property scaledSize dapat mengubah ukuran kapal pada maps dalam satuan ******px.******

### app.tsx

```tsx
import './App.css';
import React from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import Map from './components/Map';

const DUMMY_DATA = [{
    lat: -6.200000,
    lng: 106.816666
}, {
    lat: -7.161367,
    lng: 113.482498
}, {
    lat: 5.548290,
    lng: 95.323753
}, {
    lat: -3.654703,
    lng: 128.190643
}, {
    lat: -2.994494,
    lng: 120.195465
}];

interface IMap {
    //Interface dari data backend
};

function App() {
    const { isLoading, err, data, sendRequest } = useAxiosFetch<IMap>(true);
    //isLoading : masih fetching data
    //err: jika ada error
    //data: data awal
    //sendRequest: buat fetching

    React.useEffect(() => {
        //Hilangkan komen jika pen fetching API
        // sendRequest({
        //     url: 'routing-anda',
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json'}
        // }, (data) => {
        //     //callback jika mau tidak lanjut data
        // })
    }, [sendRequest]);
    
    //Jika mau Mapnya update maka bisa pakai useState lalu setMap(map: google.map.Map) sesuai dengan marker baru.
    //Uncomment component bawah untuk handling error dan loading.
  return (
    <div className="root">
        {/* {isLoading && <h1>This is Loading</h1>}
        {err && <h1>this is error</h1>} */}
        <Map coors={DUMMY_DATA}/>
    </div>
  );
}

export default App;
```

Tempat first-load (saat web tampil pertama kali dimana akan menampilkan data)