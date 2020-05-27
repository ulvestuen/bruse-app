<script>
    import mapboxgl from 'mapbox-gl';
    import {onMount} from 'svelte';
    import MapMarker from "./MapMarker.svelte";
    import {state} from "../js/state";

    let container;
    let map;

    state.subscribe(value => {
        if (map) {
            console.log("Update map")
            map.flyTo({
                center: [value.longitude, value.latitude],
                zoom: value.zoom,
                speed: 1.2,
                curve: 1.42,
                easing: function (t) {
                    return t;
                },
                essential: true
            });
        }
    })


    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css';

        link.onload = () => {
            mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN';
            map = new mapboxgl.Map({
                container,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [25.783729, 71.170946],
                zoom: 15.0
            });
        };

        document.head.appendChild(link);

        return () => {
            map.remove();
            link.parentNode.removeChild(link);
        };
    });

</script>

<style>
    .background-map {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>

<div bind:this={container}
     class="background-map">
    {#if map}
        <MapMarker map={map}/>
    {/if}
</div>