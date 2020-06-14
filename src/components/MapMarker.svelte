<script>
    import mapboxgl from 'mapbox-gl';
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    let marker;
    let container;
    export let map;

    state.subscribe(value => {
        if (marker) {
            console.log("Update marker")
            marker.setLngLat([value.longitude, value.latitude]);
        }
    })

    onMount(() => {
        marker = new mapboxgl.Marker({element: container})
                .setLngLat([25.783729, 71.170946])
                .addTo(map);
    });

</script>

<style>
    .marker {
        background-color: darkorange;
        height: 3vw;
        width: 3vw;
        border-color: gold;
        border-radius: 50%;
        border-style: solid;
        border-width: 1vw;
    }
</style>

<div bind:this={container}
     class="marker"></div>