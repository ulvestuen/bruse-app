import {state} from "./state";

export function updatePosition() {
    findPosition(0);
}

function findPosition(counter) {
    const MAX_ATTEMPTS = 3;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            state.update(value => {
                return {
                    ...value,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });
            if (position.coords.accuracy > 50 && counter < MAX_ATTEMPTS) {
                console.log("Poor location accuracy in attempt " +
                    (counter + 1) + " of " + MAX_ATTEMPTS)
                findPosition(++counter);
            }
        },
        () => console.error("Error trying to retrieve location update."),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}