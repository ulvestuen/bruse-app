import DOMPurify from 'dompurify';

export const TaskTypes = Object.freeze({
    image: 1,
    video: 2,
    audio: 3,
    html: 4
});

export async function fetchTaskContent(taskContentId) {
    const taskContentUrl = "BRUSE_API_BASE_PATH/task/content/" + taskContentId;
    const taskType = await findTaskType(taskContentUrl);
    let taskContentHtml;
    if (taskType.taskType === TaskTypes.html) {
        const responseHtml = await fetch(taskContentUrl);
        taskContentHtml = await responseHtml.text();
    }
    if (taskType.taskType === TaskTypes.image) {
        taskContentHtml = `<img src="${taskContentUrl}"
                                alt="Task image content">`
    }
    if (taskType.taskType === TaskTypes.video) {
        taskContentHtml = `<video controls
                                  preload="auto">
                               <source src="${taskContentUrl}"
                                    type="${taskType.mimeType}">
                               Task video content.
                           </video>`;
    }
    return {
        taskContentUrl,
        taskType: taskType.taskType,
        taskMimeType: taskType.mimeType,
        taskContentHtml: DOMPurify.sanitize(taskContentHtml)
    };
}

async function findTaskType(contentUrl) {
    const response = await fetch(contentUrl, {
        method: "HEAD"
    });
    const mimeType = response.headers.get("Content-Type");
    if (mimeType.startsWith("image/")) {
        return {
            mimeType: mimeType,
            taskType: TaskTypes.image
        };
    } else if (mimeType.startsWith("video/")) {
        return {
            mimeType: mimeType,
            taskType: TaskTypes.video
        };
    } else if (mimeType.startsWith("audio/")) {
        return {
            mimeType: mimeType,
            taskType: TaskTypes.audio
        };
    } else if (mimeType.startsWith("text/html")) {
        return {
            mimeType: mimeType,
            taskType: TaskTypes.html
        };
    }
}
