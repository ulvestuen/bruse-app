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
        }
    );
}