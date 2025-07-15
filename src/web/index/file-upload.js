window.addEventListener('load', async () => {

    let dropArea = document.getElementById("drop-area");

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }

    dropArea.addEventListener("dragenter", preventDefaults, false)
    dropArea.addEventListener("dragover", preventDefaults, false)
    dropArea.addEventListener("dragleave", preventDefaults, false)
    dropArea.addEventListener("drop", preventDefaults, false)
    dropArea.addEventListener("dragenter", highlight, false)
    dropArea.addEventListener("dragover", highlight, false)
    dropArea.addEventListener("dragleave", unhighlight, false)
    dropArea.addEventListener("drop", unhighlight, false)
    dropArea.addEventListener('drop', handleDrop, false)

    const defaultInput = document.getElementById("default-upload");
    defaultInput.addEventListener("change", handleFileSelect);

    function handleFileSelect(event) {
        const files = event.target.files;
        handleFiles(files);
    }

    function handleDrop(e) {
        var dt = e.dataTransfer
        var files = dt.files

        handleFiles(files)
    }

    function handleFiles(files) {
        files = [...files]
        files.forEach(uploadFile);
    }
});