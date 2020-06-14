<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";
    import {updatePosition} from "../js/geolocation";

    let gamePin;

    let gameEntryActive = false;

    state.subscribe(value => {
        gameEntryActive = value.game_entry_active;
    });

    let closeGameEntry = () => {
        state.update(value => {
            return {
                ...value,
                game_entry_active: false
            }
        });
    };

    let handleGamePinSubmit = () => {
        state.update(value => {
            return {
                ...value,
                game_pin: gamePin,
                game_entry_active: false,
                help_active_location_button: true,
                help_active_search_button: true
            }
        });
        updatePosition();
    };

    onMount(() => {

        const queryParameters = window.location.search.substring(1).split("=");
        gamePin = queryParameters[0] === "gamepin" && !isNaN(Number.parseInt(queryParameters[1]))
                ? Number.parseInt(queryParameters[1])
                : undefined;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    });
</script>

<style>
    .game-entry {
        position: absolute;
        top: 240px;
        left: 64px;
        right: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .game-entry-item {
        margin: 4px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .game-entry-input {
        margin: 4px;
        padding: 8px 8px;
        background-color: white;
        border: 1px solid gray;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        animation: rotateZ 1s infinite;
        animation-direction: alternate;
        transform: rotateZ(0deg);
    }

    .next-button {
        background-color: white;
        padding: 7px;
        border: 1px solid gray;
        border-radius: 2px;
        animation: translateX 1s infinite;
        animation-direction: alternate;
        transform: translateX(0px);
    }

    .close-button {
        background-color: white;
        border: 1px solid gray;
        border-radius: 2px;
        animation: rotateZ 1s infinite;
        animation-direction: alternate;
        transform: rotateZ(0deg);
        align-self: flex-end;
    }

    @keyframes rotateZ {
        0% {
            transform: rotateZ(-2deg);
        }
        100% {
            transform: rotateZ(2deg);
        }
    }

    @keyframes translateX {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(4px);
        }
    }

</style>
{#if gameEntryActive}
    <div class="game-entry">
        <div class="game-entry-item">
            Game pin
        </div>
        <div class="game-entry-item">
            <label for="game-pin"></label>
            <input class="game-entry-input"
                   id="game-pin"
                   type="number"
                   placeholder="Enter Game Pin here"
                   bind:value={gamePin}/>
            <div class="material-icons next-button" on:click={handleGamePinSubmit}>double_arrow</div>
        </div>
        <div class="material-icons close-button" on:click={closeGameEntry}>close</div>
    </div>
{/if}