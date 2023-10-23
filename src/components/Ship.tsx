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