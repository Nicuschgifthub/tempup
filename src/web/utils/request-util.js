const makeRequest = async (method, path, data) => {
    try {
        const response = await fetch(path, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: method === 'POST' ? JSON.stringify(data) : undefined,
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const requestPost = (path, data) => makeRequest('POST', path, data);
const requestGet = (path) => makeRequest('GET', path);