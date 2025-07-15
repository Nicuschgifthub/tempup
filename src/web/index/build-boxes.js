const downloadBox = document.getElementById("main-download-boxes");

const insertBox = (html) => {
    downloadBox.insertAdjacentHTML("beforeend", html);
}

const percentage = (value, total) => {
    return (value / total) * 100;
}

const calculatePercentage = (uploadtime, onlineuntil) => Math.min(100, ((Date.now() - uploadtime) / (onlineuntil - uploadtime)) * 100).toFixed(2);

const timer = (elementId, onlineuntil, uploadtime, expire) => {
    if (!document.getElementById(elementId)) return;
    document.getElementById(elementId).value = percentage(((uploadtime + expire) - Date.now()), expire);

    setTimeout(() => {
        if (onlineuntil < Date.now()) {
            document.getElementById(`div/${id}`).remove();
        } else {
            timer(elementId, onlineuntil, uploadtime, expire);
        }
    }, 1000);
}

const addDownloadBox = (id, data) => {

    let fileViewer = `<a class="href-text" id="href-viewer/${id}" href="/viewer/${id}">Open</a>`;

    if (data.viewer == undefined) {
        fileViewer = "";
    }

    const html = `
    <div id="div/${id}" class="box" style="background-image: url(${data.imageurl})">
    ${fileViewer}
        <div class="innerbox">
            <a class="href-text" id="href/${id}" href="/download/${id}" download="${data.name}" download>
            ${(data.name.length > 20 ? (data.name.slice(0, 15) + '[...].' + data.format) : data.name)}
             </a>
        </div>
        <progress class="progresstimer" id="progressBar/ui/${id}" value="0" max="100"></progress>
    </div>`;

    insertBox(html);
    timer(`progressBar/ui/${id}`, data.onlineuntil, data.uploadtime, data.expire);
}

const addUploadingBox = (id, data) => {
    if (document.getElementById(`u-div/${id}`)) {
        document.getElementById(`progressBar/${id}`).value = data.uploaded;
        return;
    }

    const html = `
    <div id="u-div/${id}" class="box">
    <h3>${data.name}</h3>
        <div class=" innerbox">
            <progress class="progresstimer" id="progressBar/${id}" value="${data.uploaded}" max="100"></progress>
        </div>
    </div>`;

    insertBox(html);
}

const removeOldItems = (files, uploadingFiles) => {
    const childElements = downloadBox.children;

    for (let i = 0; i < childElements.length; i++) {
        const childElement = childElements[i];

        if (childElement.id.startsWith("u-div")) {
            if (!uploadingFiles[childElement.id.split("/")[1]]) {
                downloadBox.removeChild(childElement);
            }
        } else {
            if (!files[childElement.id.split("/")[1]]) {
                downloadBox.removeChild(childElement);
            }
        }
    }
}

const rebuildBoxes = async () => {
    const files = await requestGet('/files/list');
    const uploadingFiles = await requestGet('/files/list/unfinished');

    Object.keys(files).forEach(key => {
        if (!document.getElementById(`div/${key}`)) {
            addDownloadBox(key, files[key]);
        }
    });

    Object.keys(uploadingFiles).forEach(key => {
        addUploadingBox(key, uploadingFiles[key]);
    });

    removeOldItems(files, uploadingFiles);
}


const awaitServerUpdate = async () => {
    await requestGet('/on-change/basic-update');

    rebuildBoxes();
    awaitServerUpdate();
}

rebuildBoxes();
awaitServerUpdate();