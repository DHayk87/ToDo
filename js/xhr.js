function customFetch(URL, METHOD = 'GET') {
    return new Promise((response, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(METHOD, URL)
        xhr.onload = function () {
            if (xhr.status < 400) {
                return response(JSON.parse(xhr.response))
            } else {
                return reject(xhr.status)
            }
        }
        xhr.send()
    })
}


export {customFetch}