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
