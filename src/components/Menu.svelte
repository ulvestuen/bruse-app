<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    let menuIsActive = false;
    state.subscribe(value => {
        menuIsActive = value.menu_active;
    });

    let closeMenu = () => {
        state.update(value => {
            return {
                ...value,
                menu_active: false
            };
        })
    };

    let enterGame = () => {
        closeMenu();
        state.update(value => {
            return {
                ...value,
                game_entry_active: true
            };
        });
    };

    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    })
</script>

<style>
    .menu {
        position: absolute;
        top: 80px;
        left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
    }

    .menu-item {
        margin: 4px;
        padding: 4px 8px;
        background-color: white;
        border: 1px solid gray;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        animation: rotateZ 1s infinite;
        animation-direction: alternate;
        transform: rotateZ(4deg);
    }

    .menu-item-text {
        margin-left: 4px;
        font-weight: bold;
    }

    .close-button {
        background-color: white;
        border: 1px solid gray;
        border-radius: 2px;
        animation: rotateZ 1s infinite;
        animation-direction: alternate;
        transform: rotateZ(4deg);
        align-self: flex-end;
    }

    @keyframes rotateZ {
        0% {
            transform: rotateZ(-4deg);
        }
        100% {
            transform: rotateZ(4deg);
        }
    }

</style>
{#if menuIsActive}
    <div class="menu">
        <div class="menu-item"
             on:click={enterGame}>
            <div class="material-icons" aria-hidden="true">videogame_asset</div>
            <div class="menu-item-text">Enter game</div>
        </div>
        <div class="menu-item"
             on:click={() => window.open("https://bruse.dev")}>
            <div class="material-icons" aria-hidden="true">open_in_new</div>
            <div class="menu-item-text">About</div>
        </div>
        <div class="material-icons close-button" on:click={closeMenu}>close</div>
    </div>
{/if}