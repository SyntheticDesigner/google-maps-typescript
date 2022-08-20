"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../app.css");
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector("form");
const addressInput = document.getElementById("address");
const GOOGLE_API_KEY = "AIzaSyAXBMaKkUbulpq8i5WWcq6VaA-9A7O_bps";
function searchAddressHandler(event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    axios_1.default
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then((res) => {
        if (res.data.status != "OK") {
            throw new Error("Could not fetch location");
        }
        const coords = res.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map"), {
            center: coords,
            zoom: 8,
        });
        new google.maps.Marker({
            position: coords,
            map: map,
        });
    })
        .catch((err) => {
        console.log(err);
    });
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", searchAddressHandler);
//# sourceMappingURL=app.js.map