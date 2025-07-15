let totalChunks = 0;
let uploadedChunks = 0;
let totalFiles = 0;
let uploadedFiles = 0;
let tryingUploadChunks = 0;

const textInfo = document.getElementById("temp-up-info-box");

const updateTextString = () => {
    if (totalFiles == uploadedFiles) {
        textInfo.innerText = ``;
        totalChunks = 0;
        uploadedChunks = 0;
        totalFiles = 0;
        uploadedFiles = 0;
        return;
    }

    textInfo.innerText = `Uploads; Files[${uploadedFiles}|${totalFiles}] - [${Math.floor((uploadedChunks / totalChunks) * 100)}%] Chunks[${uploadedChunks}|${totalChunks}]`;

}


const uploadFile = (file) => {
    const chunkSize = (1024 * 1024) * 2; // 2MB chunks
    const totalChunksIndex = Math.ceil(file.size / chunkSize);

    totalFiles++;
    totalChunks += totalChunksIndex;

    let currentChunk = 0;

    const chunkId = Math.random().toString(36).substring(2);
    const fileName = file.name;
    const filetype = file.type;

    const uploadChunk = async () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('totalChunks', totalChunksIndex);
        formData.append('currentChunk', currentChunk);
        formData.append('id', chunkId);
        formData.append('name', fileName);
        formData.append('type', filetype);

        try {
            tryingUploadChunks++;

            const response = await fetch('/tempup/upload/chunk', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed.');
            }

            updateTextString();

            currentChunk++;
            uploadedChunks++;
            if (currentChunk < totalChunksIndex) {
                uploadChunk();
            } else {
                uploadedFiles++;
                updateTextString();
            }
        } catch (error) {
            updateTextString();
            console.log(error);
        }
    };

    if (file) {
        uploadChunk();
    }

    updateTextString();
}