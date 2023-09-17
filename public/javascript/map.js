// Création des icônes pour la carte
var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [38, 50],
    // shadowSize: [50, 64],
    // iconAnchor: [22, 94],
    // shadowAnchor: [4, 62],
    popupAnchor: [-3, -40],
  },
});

var blackIcon = new LeafIcon({ iconUrl: "public/assets/icons/black.png" }),
  maroonIcon = new LeafIcon({ iconUrl: "public/assets/icons/maroon.png" }),
  redIcon = new LeafIcon({ iconUrl: "public/assets/icons/red.png" }),
  orangeIcon = new LeafIcon({ iconUrl: "public/assets/icons/orange.png" }),
  yellowIcon = new LeafIcon({ iconUrl: "public/assets/icons/yellow.png" });

// Conversion de la position en décimal
function convertDMSToDecimal(degrees, minutes, seconds, direction) {
  // Calcul du degré décimal
  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  // Vérification de la direction (N, S, E, W)
  if (direction === "S" || direction === "W") {
    decimalDegrees = -decimalDegrees;
  }

  return decimalDegrees;
}
// Récupération des données de tri
// function getTotal() {
var totalPlastic = [];
fetch("Data/plastiqueSum", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    response.forEach((element) => {
      totalPlastic.push(element["total"]);
    });
    return totalPlastic;
  });
// }

// Définissez une variable pour stocker la mer sélectionnée
let selectedSea = null;

document
  .getElementById("btn-mer-tyrrhenienne")
  .addEventListener("click", function () {
    selectedSea = "Mer Tyrrhenienne";
    displaySamples();
  });

document.getElementById("btn-lion").addEventListener("click", function () {
  selectedSea = "Golfe du lion";
  displaySamples();
});

document
  .getElementById("btn-mer-ligurienne")
  .addEventListener("click", function () {
    selectedSea = "Mer Ligurienne";
    displaySamples();
  });

document
  .getElementById("btn-mer-sardaigne")
  .addEventListener("click", function () {
    selectedSea = "Mer de Sardaigne";
    displaySamples();
  });

document
  .getElementById("btn-bouches-bonifacio")
  .addEventListener("click", function () {
    selectedSea = "Bouches de Bonifacio";
    displaySamples();
  });

// Créez un tableau pour stocker les marqueurs actuels
var currentMarkers = [];

console.log(selectedSea);
console.log(currentMarkers);

function displaySamples() {
  // Récupération des données de prélèvement
  fetch("Data/data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let i = 0;
      currentMarkers.forEach(function (marker) {
        map.removeLayer(marker);
      });
      currentMarkers = [];
      response.forEach((element) => {
        if (element["name"] === selectedSea) {
          let latitude = element["Start_Latitude"];
          latitude = latitude.split(/[^\d\w]+/);
          let latitudeDecimal = convertDMSToDecimal(
            parseInt(latitude[0]),
            parseInt(latitude[1]),
            parseInt(latitude[2]),
            parseInt(latitude[3])
          ).toFixed(2);
          let longitude = element["Start_Longitude"];
          longitude = longitude.split(/[^\d\w]+/);
          let longitudeDecimal = convertDMSToDecimal(
            parseInt(longitude[0]),
            parseInt(longitude[1]),
            parseInt(longitude[2]),
            parseInt(longitude[3])
          ).toFixed(2);
          if (totalPlastic[i] > 500) {
            var marker = L.marker([latitudeDecimal, longitudeDecimal], {
              icon: blackIcon,
            });
          } else if (totalPlastic[i] >= 300 && totalPlastic[i] < 500) {
            var marker = L.marker([latitudeDecimal, longitudeDecimal], {
              icon: maroonIcon,
            });
          } else if (totalPlastic[i] >= 100 && totalPlastic[i] < 300) {
            var marker = L.marker([latitudeDecimal, longitudeDecimal], {
              icon: redIcon,
            });
          } else if (totalPlastic[i] >= 50 && totalPlastic[i] < 100) {
            var marker = L.marker([latitudeDecimal, longitudeDecimal], {
              icon: orangeIcon,
            });
          } else if (totalPlastic[i] >= 0 && totalPlastic[i] < 50) {
            var marker = L.marker([latitudeDecimal, longitudeDecimal], {
              icon: yellowIcon,
            });
          }
          marker.addTo(map);
          currentMarkers.push(marker);
          marker.bindPopup(`
        <b>Echantillon : <a href="data/detailBySample/${element["Sample"]}">${element["Sample"]}</a></b>
        <p><em>Microplastiques récoltés : ${totalPlastic[i]}</em></p>
        <p>Mer : ${element["name"]}</p>
        <p>Date : ${element["Date"]}</p>
        <p>Concentration au km2 : ${element["Concentration_nb_km2"]}</p>
        <p>Concentration au m3 : ${element["Concentration_nb_m3"]}</p>
        `);
          i++;
        }
      });
    });
}

const mediterranean = {
  lat: 41,
  lng: 9,
};

const zoomLevel = 6;

var map = L.map("map").setView(
  [mediterranean.lat, mediterranean.lng],
  zoomLevel
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fetch("Data/allSeasJson", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    // Coordonnées et rayon de la Mer Tyrrhénienne
    var tyrrhenianSeaCenter = [40.5, 12]; // Coordonnées du centre
    var tyrrhenianSeaRadius = 270000; // Rayon en mètres (ajustez selon vos besoins)

    var tyrrhenianSeaCircle = L.circle(tyrrhenianSeaCenter, {
      color: "green",
      fillOpacity: 0.4,
      radius: tyrrhenianSeaRadius,
    }).addTo(map);
    tyrrhenianSeaCircle.bindPopup(
      `<b>Echantillon : <a href="data/detailBySeas/${response[0].id_sea}">Mer Tyrrhénienne</a></b>`
    );

    // Coordonnées et rayon de la Mer Ligurienne
    var ligurianSeaCenter = [43.25, 8.5]; // Coordonnées du centre
    var ligurianSeaRadius = 180000; // Rayon en mètres (ajustez selon vos besoins)

    var ligurianSeaCircle = L.circle(ligurianSeaCenter, {
      color: "red",
      fillOpacity: 0.4,
      radius: ligurianSeaRadius,
    }).addTo(map);
    ligurianSeaCircle.bindPopup(
      `<b>Echantillon : <a href="data/detailBySeas/${response[3].id_sea}">Mer Ligurienne</a></b>`
    );

    // Coordonnées et rayon de la Mer de Sardaigne
    var sardinianSeaCenter = [40.0, 7.5]; // Coordonnées du centre
    var sardinianSeaRadius = 205000; // Rayon en mètres (ajustez selon vos besoins)

    var sardinianSeaCircle = L.circle(sardinianSeaCenter, {
      color: "purple",
      fillOpacity: 0.4,
      radius: sardinianSeaRadius,
    }).addTo(map);
    sardinianSeaCircle.bindPopup(
      `<b>Echantillon : <a href="data/detailBySeas/${response[2].id_sea}">Mer de Sardaigne</a></b>`
    );

    // Coordonnées et rayon des Bouches de Bonifacio
    var bonifacioStraitCenter = [41.5, 9.3]; // Coordonnées du centre
    var bonifacioStraitRadius = 50000; // Rayon en mètres (ajustez selon vos besoins)

    var bonifacioStraitCircle = L.circle(bonifacioStraitCenter, {
      color: "orange",
      fillOpacity: 0.4,
      radius: bonifacioStraitRadius,
    }).addTo(map);
    bonifacioStraitCircle.bindPopup(
      `<b>Echantillon : <a href="data/detailBySeas/${response[1].id_sea}">Bouches de Bonifacio</a></b>`
    );

    // Coordonnées et rayon du Golfe du Lion
    var gulfOfLionCenter = [42.5, 5.0]; // Coordonnées du centre
    var gulfOfLionRadius = 160000; // Rayon en mètres (ajustez selon vos besoins)

    var gulfOfLionCircle = L.circle(gulfOfLionCenter, {
      color: "cyan",
      fillOpacity: 0.4,
      radius: gulfOfLionRadius,
    }).addTo(map);

    // Légende pour le Golfe du Lion
    gulfOfLionCircle.bindPopup(
      `<b>Echantillon : <a href="data/detailBySeas/${response[4].id_sea}">Golfe du lion</a></b>`
    );
  });
