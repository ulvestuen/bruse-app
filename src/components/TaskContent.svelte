<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";
    import {fetchTaskContent} from '../js/task_content';

    let taskContentActive = false;
    let taskContentId;

    state.subscribe(value => {
        taskContentActive = value.task_content_active;
        taskContentId = value.task_content_id;
    });


    let closeTask = () => {
        state.update(value => {
            return {
                ...value,
                task_content_active: false,
                task_content_id: undefined
            };
        })
    };

    onMount(async () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    });
</script>

<style>

    .task {
        position: absolute;
        top: 128px;
        left: 24px;
        right: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .task-item {
        margin: 4px;
        padding: 4px 8px;
        background-color: white;
        border: 1px solid gray;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
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
{#if taskContentActive}
    <div class="task">
        {#if taskContentId}
            <div class="task-item">
                {#await fetchTaskContent(taskContentId)}
                    Loading...
                {:then value}
                    {@html value.taskContentHtml}
                {:catch e}
                    An error occurred while fetching task content:<br/>
                    {e}
                {/await}
            </div>
        {:else}
            <div class="task-item">
                No task available at this location.
            </div>
        {/if}
        <div class="material-icons close-button" on:click={closeTask}>close</div>
    </div>
{/if}