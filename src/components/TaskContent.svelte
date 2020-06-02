<script>
    import {onMount} from 'svelte';
    import {state} from "../js/state";
    import DOMPurify from 'dompurify';

    const TaskTypes = Object.freeze({
        image: 1,
        html: 2
    });

    let taskContentActive = false;
    let taskContentId;

    let taskContentType;
    let taskContentBlobUrl;
    let taskContentHtml;


    state.subscribe(value => {
        taskContentActive = value.task_content_active;
        taskContentId = value.task_content_id;
    });


    let closeTask = () => {
        taskContentType = undefined;
        taskContentBlobUrl = undefined;
        taskContentHtml = undefined;

        state.update(value => {
            return {
                ...value,
                task_content_active: false
            };
        })
    };

    let fetchTaskContent = async () => {
        const response = await fetch("BRUSE_API_BASE_PATH/task/content/" + taskContentId);
        taskContentType = findTaskType(response.headers.get("Content-Type"));
        if (taskContentType === TaskTypes.image) {
            const content = await response.blob();
            taskContentBlobUrl = (window.URL ? URL : webkitURL).createObjectURL(content);
        } else if (taskContentType === TaskTypes.html) {
            taskContentHtml = DOMPurify.sanitize(await response.text());
        }
    };

    function findTaskType(taskContentMimeType) {
        if (taskContentMimeType.startsWith("image/")) {
            return TaskTypes.image;
        } else if (taskContentMimeType.startsWith("text/html")) {
            return TaskTypes.html;
        }
    }

    onMount(async () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(link);
        return () => link.parentNode.removeChild(link);
    })
</script>

<style>

    .task {
        position: absolute;
        top: 160px;
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

    :global(img) {
        width: 100%;
        height: auto;
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
            <div class="task-item" use:fetchTaskContent>
                {#if taskContentType === TaskTypes.image}
                    <img src={taskContentBlobUrl}>
                {:else if taskContentType === TaskTypes.html}
                    {@html taskContentHtml}
                {/if}
            </div>
        {:else}
            <div class="task-item">
                No task available at this location.
            </div>
        {/if}
        <div class="material-icons close-button" on:click={closeTask}>close</div>
    </div>
{/if}