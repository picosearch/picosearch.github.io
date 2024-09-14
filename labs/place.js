const loadPlaces = function (coords) {
  // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
  const method = "api";

  const PLACES = [
    {
      name: "Your place name",
      location: {
        lat: 13.081449884160381, // add here latitude if using static data
        lng: 77.63904345692725 // add here longitude if using static data
      }
    }
  ];

  return Promise.resolve(PLACES);
};

window.onload = () => {
  const scene = document.querySelector("a-scene");

  // first get current user location
  return navigator.geolocation.getCurrentPosition(
    function (position) {
      // than use it to load from remote APIs some places nearby
      loadPlaces(position.coords).then((places) => {
        places.forEach((place) => {
          const latitude = place.location.lat;
          const longitude = place.location.lng;

          // add place name
          const text = document.createElement("a-link");
          text.setAttribute(
            "gps-entity-place",
            `latitude: ${latitude}; longitude: ${longitude};`
          );
          text.setAttribute("title", place.name);
          text.setAttribute("href", "http://www.example.com/");
          text.setAttribute("scale", "20 20 20");

          text.addEventListener("loaded", () => {
            window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
          });

          scene.appendChild(text);
        });
      });
    },
    (err) => console.error("Error in retrieving position", err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000
    }
  );
};
