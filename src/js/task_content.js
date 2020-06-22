import DOMPurify from 'dompurify';

export const TaskTypes = Object.freeze({
    image: 1,
    video: 2,
    audio: 3,
    html: 4
});

export async function fetchTaskContent(taskContentId) {
    const response = await fetch("BRUSE_API_BASE_PATH/task/content/info/" + taskContentId);
    if (response.ok) {
        const taskContentInfo = await response.json();
        const taskType = findTaskType(taskContentInfo.task_content_type);
        let taskContentHtml;
        if (taskType === TaskTypes.html) {
            const responseHtml = await fetch(taskContentInfo.task_content_url);
            taskContentHtml = await responseHtml.text();
        }
        if (taskType === TaskTypes.image) {
            taskContentHtml = `<img src="${taskContentInfo.task_content_url}"
                                    alt="Task image content">`
        }
        if (taskType === TaskTypes.video) {
            taskContentHtml = `<video controls
                                  preload="auto">
                               <source src="${taskContentInfo.task_content_url}"
                                       type="${taskContentInfo.task_content_type}">
                               Task video content.
                           </video>`;
        }
        return {
            taskContentUrl: taskContentInfo.task_content_url,
            taskType,
            taskMimeType: taskContentInfo.task_content_type,
            taskContentHtml: DOMPurify.sanitize(taskContentHtml)
        };
    } else {
        throw new Error("Unexpected response code from server when fetching task content info.");
    }
}

function findTaskType(contentType) {
    if (contentType.startsWith("image/")) {
        return TaskTypes.image;
    } else if (contentType.startsWith("video/")) {
        return TaskTypes.video;
    } else if (contentType.startsWith("audio/")) {
        return TaskTypes.audio;
    } else if (contentType.startsWith("text/html")) {
        return TaskTypes.html;
    }
}
