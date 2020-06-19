export const TaskTypes = Object.freeze({
    image: 1,
    video: 2,
    audio: 3,
    html: 4
});


export async function findTaskType(contentUrl) {
    console.log("findTaskType")
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
