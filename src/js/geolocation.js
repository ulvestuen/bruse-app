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

function createGeolocationWatcher() {
    return navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

export function watchPosition() {
    const WATCH_TIME_MS = 20000;
    const watchId = createGeolocationWatcher();
    setTimeout(() => navigator.geolocation.clearWatch(watchId), WATCH_TIME_MS);
}
