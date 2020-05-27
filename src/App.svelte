<script>
    import Map from "./components/Map.svelte";
    import {state} from "./js/state";
    import LocationUpdateButton from "./components/LocationUpdateButton.svelte";
    import MenuButton from "./components/MenuButton.svelte";
    import Menu from "./components/Menu.svelte";
    import GameEntry from "./components/GameEntry.svelte";
    import GameConfig from "./components/GameConfig.svelte";
    import TaskSearchButton from "./components/TaskSearchButton.svelte";


    let obj;

    state.subscribe(value => obj = value);

    let check = function () {
        console.log(obj);
        setTimeout(check, 1000);
    }
    //check();

</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <Map/>
    <MenuButton/>
    <LocationUpdateButton/>
    <TaskSearchButton/>
    <Menu/>
    <GameEntry/>
    <GameConfig/>
</main>
