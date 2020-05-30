import {state} from "./state";

export function updatePosition() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            state.update(value => {
                return {
                    ...value,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });
        },
        () => console.log("Error trying to retrieve location update."),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 5000
        }
    );
}