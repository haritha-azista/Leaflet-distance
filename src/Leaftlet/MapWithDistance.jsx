import React, { useRef, useState } from 'react';
import { TileLayer, MapContainer, useMapEvents, Popup, Marker } from 'react-leaflet';
import 'leaflet-geometryutil';

const MapWithDistance = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const mapref = useRef(null);
  const [endPoint, setEndPoint] = useState({ lat: 0, lng: 0 });
  const [firstPoint, setFirstPoint] = useState();
  const [lastPoint, setLastPoint] = useState();
  const [selectingStart, setSelectingStart] = useState(true);
  const [finalDis, setfinalDis] = useState(0);

  function Mycomponent() {
    const map = useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        if (selectingStart) {
          const { lat, lng } = e.latlng;
          console.log("start" + lat, lng);
          setStartPoint({ lat: lat, lng: lng });
          setFirstPoint(e.layerPoint);
          console.log(firstPoint);
          setSelectingStart(false);
        }
        else {
          const { lat, lng } = e.latlng;
          console.log("end " + lat, lng);
          setLastPoint(e.layerPoint);
          console.log(lastPoint);
          setEndPoint({ lat: lat, lng: lng });
          // console.log(endPoint);
          setSelectingStart(true);

        }
      }
    })
    
    let length = map.distance(startPoint, endPoint)
    const finaldisvalue = length
    setfinalDis(finaldisvalue)

    return null;
  }

  return (
    <div>
      <MapContainer center={[17, 7]} zoom={2} style={{ height: '400px' }}
        ref={mapref}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {startPoint && (
          <Marker position={startPoint}>
            <Popup>Start Point </Popup>
          </Marker>
        )}
        {endPoint && (
          <Marker position={endPoint}>
            <Popup>End Point</Popup>
          </Marker>
        )}

        <Mycomponent />

      </MapContainer>
      <h5>Distance : {finalDis} m</h5>
    </div>
  );
};

export default MapWithDistance;
