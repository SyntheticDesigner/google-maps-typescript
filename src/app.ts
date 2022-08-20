import "../app.css";
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyAXBMaKkUbulpq8i5WWcq6VaA-9A7O_bps";
//this key no longer exists

// declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //send this to googles API: already has typescript support
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      if (res.data.status != "OK") {
        throw new Error("Could not fetch location");
      }

      const coords = res.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coords,
          zoom: 8,
        }
      );
      new google.maps.Marker({
        position: coords,
        map: map,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

form?.addEventListener("submit", searchAddressHandler);
