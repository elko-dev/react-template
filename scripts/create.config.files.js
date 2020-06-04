const fs = require('fs');
const rp = require('request-promise');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/cloud-platform'];
const WEB_CONFIG_FILE = "./src/config/web-spawn-platform.json";
const WEB_CONFIG_PATH = "./src/config";
const projectName = process.argv.slice(2)[0];
const webAppName = process.argv.slice(2)[1];
function getAccessToken() {
    return new Promise(function (resolve, reject) {
        var key = require('../config/spawn-platform.json');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

//TODO: refactor this into spawn creation
const createWebFirebaseConfig = async (projectID, webAppID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.promises.mkdir(WEB_CONFIG_PATH, { recursive: true });
            const webApp = await getWebConfig(projectID, webAppID);
            fs.writeFileSync(WEB_CONFIG_FILE, JSON.stringify(webApp), { recursive: true });
            console.log('succesfully generated Web config file')
            resolve()
        }
        catch (error) {
            reject(error)
        }
    })
}

const getWebConfig = async (projectID, webAppID) => {
    const accessToken = await getAccessToken();
    const options = {
        uri: 'https://firebase.googleapis.com/v1beta1/projects/' + projectID + '/webApps/' + webAppID + '/config',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        json: true,
    };
    return rp(options);
}

try {
    createWebFirebaseConfig(projectName, webAppName)
        .then((config) => { })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        })
}
catch (error) {
    console.log('Error creating Android and IOS configuration files ', error)
    process.exit(1)
}