<script>
    import {updatePosition} from "../js/geolocation";
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    let searchButtonActive = false;
    let helpTextActive = true;

    state.subscribe(value => {
        searchButtonActive = !!value.game_pin;
        helpTextActive = value.help_active_search_button;
    })

    let searchForTask = () => {
        updatePosition();
        state.update(value => {
            return {
                ...value,
                help_active_search_button: false,
                zoom: 15.0
            }
        })
        console.log("Searching for task");
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
    .search-button {
        position: absolute;
        top: 72px;
        right: 24px;
    }

    .help-text {
        position: absolute;
        top: 84px;
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
{#if searchButtonActive}
    <button class="mdc-icon-button material-icons search-button"
            on:click={searchForTask}>
        search
    </button>
    {#if helpTextActive}
        <div class="help-text">
            <div>Any tasks here?</div>
            <div class="material-icons">arrow_right_alt</div>
        </div>
    {/if}
{/if}