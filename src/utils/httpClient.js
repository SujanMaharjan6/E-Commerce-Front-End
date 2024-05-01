import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;


const http = axios.create({
    baseURL: BASEURL,
    responseType: 'json'
})

const getHeaders = (isSecured = false) => {
    let options = {
        'Content-Type': 'application/json',
    }
    if (isSecured) {
        options['Authorization'] = localStorage.getItem('token')
    }
    return options;
}

/**
//  * http post request method
 * @param {string} url 
 * @param {object} data 
 * @param {object} [params] 
 * @return {Promise}
 */
const POST = (url, data, isSecured, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params

    })
}
const GET = (url, isSecured, params = {}) => {
    return http.get(url, {
        headers: getHeaders(isSecured),
        params

    })
}
const PUT = (url, data, isSecured, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params

    })
}
const DELETE = (url, isSecured, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params

    })
}

const UPLOAD = (method, url, data, files) => {
   
   return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formdata = new FormData();

    if (files.length) {
        files.forEach((item,index) => {
            // formdata.append('images', files[0], files[0].name)
            formdata.append('images', item, item.name)
            console.log('files foreach', item);
            console.log('files foreach', formdata);
        })
    
    }
    for (let key in data) {
        formdata.append(key, data[key]);
        // console.log('key', key);
        // console.log('datakey', data[key]);
    }

    xhr.onreadystatechange = () => {
        console.log('check ready state>>', xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log('file uploaded succesfully', xhr.response);
                resolve(xhr.response);
            }
            else {
                // console.log('file uploaded failed', xhr.response);
                reject(xhr.response);
            }
        }
    }
    // console.log('formdata', formdata);

    // console.log('formdata', formdata);

    xhr.open(method, `${BASEURL}${url}?token=${(localStorage.getItem('token'))}`, true)
    xhr.send(formdata);
   })
   
}

const httpVerb = {
    POST,
    PUT,
    GET,
    DELETE,
    UPLOAD
}

export default httpVerb;