import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { COLORS } from "./options";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.js";

export function Map({ data }) {
  const getIcon = (color) => {
    return L.ExtraMarkers.icon({
      icon: "fa-marker",
      markerColor: color,
      shape: "penta",
      prefix: "fa",
      svg: true,
    });
  };

  return (
    <MapContainer
      center={[53, 9]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "500px" }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoicm9va2llcm9vayIsImEiOiJjbDA4MnVhbnQwNTFjM2NwOXBycHU2ZHNrIn0.64Yv7XFZumGxYKAMCvm8nA"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {data &&
        Object.entries(data).length !== 0 &&
        Object.entries(data).map(([key, value], i) => (
          <Marker
            key={i}
            position={[value.lat, value.lng]}
            animate={true}
            icon={getIcon(COLORS[i])}
          >
            <Tooltip>
              <h3>{value.name}</h3>
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
}
