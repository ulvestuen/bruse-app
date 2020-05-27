<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    })

    let toggleMenu = () => {
        state.update((value => {
            return {
                ...value,
                game_entry_active: false,
                menu_active: !value.menu_active
            }
        }))
    }


</script>

<style>
    .menu-button {
        position: absolute;
        top: 24px;
        left: 24px;
    }

</style>

<button class="mdc-icon-button material-icons menu-button"
        on:click={toggleMenu}>
    menu
</button>