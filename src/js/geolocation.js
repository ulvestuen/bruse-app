import {state} from "./state";

let successCallback = (position) => {
    state.update(value => {
        return {
            ...value,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    });
};

let errorCallback = (e) => console.error("Error trying to retrieve location update.");

function findPosition() {
    navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

export function updatePosition() {
    const WATCH_TIME_MS = 10000;
    const WATCH_PERIOD_MS = 1000;
    const timerId = setInterval(findPosition, WATCH_PERIOD_MS);
    setTimeout(() => clearInterval(timerId), WATCH_TIME_MS);

}
