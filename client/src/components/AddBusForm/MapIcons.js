import L from "leaflet";

import startMarker from "../../resources/icons/startMarker.svg";
import finishMarker from "../../resources/icons/finishMarker.svg";

const createIcon = function (iconUrl) {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [60, 60],
    iconAnchor: [29, 45],
    popupAnchor: [0, -40],
  });
};

const startIcon = createIcon(startMarker);
const finishIcon = createIcon(finishMarker);

export { startIcon, finishIcon };
