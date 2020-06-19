<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";
    import DOMPurify from 'dompurify';
    import {TaskTypes, findTaskType} from '../js/task_content'

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
                task_content_active: false
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

    async function fetchTaskContent(taskContentId) {
        const taskContentUrl = "BRUSE_API_BASE_PATH/task/content/" + taskContentId;
        const taskType = await findTaskType(taskContentUrl);
        let taskContentHtml;
        if (taskType.taskType === TaskTypes.html) {
            if (taskType.taskType === TaskTypes.html) {
                const responseHtml = await fetch(taskContentUrl);
                taskContentHtml = DOMPurify.sanitize(await responseHtml.text());
            }
        }
        return {
            taskContentUrl,
            taskType: taskType.taskType,
            taskMimeType: taskType.mimeType,
            taskContentHtml
        };
    }
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
                    {#if value.taskType === TaskTypes.image}
                        <img src={value.taskContentUrl}
                             alt="Task image content">
                    {:else if value.taskType === TaskTypes.video}
                        <video controls
                               preload="auto">
                            <source src={value.taskContentUrl}
                                    type={value.taskMimeType}>
                            Task video content
                        </video>
                    {:else if value.taskType === TaskTypes.html}
                        {@html value.taskContentHtml}
                    {/if}
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