<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";

    let gamePin;

    state.subscribe(value => {
        gamePin = value.game_pin;
    });


    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    });
</script>

<style>

    .footer {
        position: absolute;
        bottom: 10px;
        left: 96px;
        right: 96px;
    }


</style>
{#if gamePin}
    <div class="footer">
        Game Pin: {gamePin}
    </div>
{/if}