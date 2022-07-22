const FormData = require('form-data'); // npm install --save form-data
const fs = require('fs'); // npm install --save fs
const axios = require('axios'); // npm install --save axios



/*
type: file
action: upload
timestamp: 1656833558090
auth_token: 7a85187d637bab53cd4d45169d9ce47ac233e2fe
nsfw: 0
*/
const form = new FormData();
form.append('source', fs.createReadStream(`C:/Users/Laffy/Desktop/EWDv8sgU4AESJ1Z.png`));
form.append('type', 'file');
form.append('action', 'upload');
form.append('timestamp', '1656833558090');
form.append('auth_token', '7a85187d637bab53cd4d45169d9ce47ac233e2fe');
form.append('nsfw', '0');


let url = "https://freeimage.host/json"

axios.post(url, form).then(response => {
    console.log(response.data);
})
    .catch(error => {
        console.log(error);
    }
    );