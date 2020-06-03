<script>
    import {updatePosition} from "../js/geolocation";
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    let locationButtonActive = false;
    let helpTextActive = true;

    state.subscribe(value => {
        locationButtonActive = !!value.game_pin;
        helpTextActive = value.help_active_location_button;
    })

    let updateLocation = () => {
        console.log("Update location");
        state.update(value => {
            return {
                ...value,
                help_active_location_button: false,
                zoom: 15.0
            }
        })
        updatePosition();
    }

    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    })

</script>

<style>
    .update-location {
        position: absolute;
        top: 24px;
        right: 24px;
    }

    .help-text {
        position: absolute;
        top: 36px;
        right: 72px;
        display: flex;
        flex-direction: row;
        align-items: center;
        animation: translateX 1s infinite;
        animation-direction: alternate;
        transform: translateX(0px);
    }

    .help-text div {
        margin: 2px;
    }

    @keyframes translateX {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(-4px);
        }
    }

</style>
{#if locationButtonActive}
    <button class="mdc-icon-button material-icons update-location"
            on:click={updateLocation}>
        location_searching
    </button>
    {#if helpTextActive}
        <div class="help-text">
            <div>Update position</div>
            <div class="material-icons">arrow_right_alt</div>
        </div>
    {/if}
{/if}