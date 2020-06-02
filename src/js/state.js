import {writable} from "svelte/store";

export const state = writable({
    game_entry_active: true,
    game_pin: undefined,
    latitude: 71.170946,
    longitude: 25.783729,
    help_active_location_button: true,
    help_active_search_button: true,
    menu_active: false,
    task_content_active: false,
    task_content_id: undefined,
    zoom: 15.0
});
