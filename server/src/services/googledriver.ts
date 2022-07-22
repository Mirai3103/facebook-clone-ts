/* eslint-disable max-len */
import { google } from "googleapis";
import { v4 } from 'uuid';
import { Readable } from 'stream';

import { BadRequestError } from "@shared/errors";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const regexFileExtension = /(\w+$)/;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
    access_token: ACCESS_TOKEN,
})
const driver = google.drive({
    version: "v3",
    auth: oauth2Client
});

export async function upload(fileName: string, fileBuffer: Buffer) {
    const total = fileName.match(regexFileExtension);
    if (!total)
        throw new BadRequestError("File extension not found");
    fileName = v4() + "." + total[0];
    const res = await driver.files.create({
        requestBody: {
            name: fileName,
            mimeType: "image/" + total[0],
            parents: ['1aB_CUF1RJ12thind8lFj82pyVKfxo0Qu']
        },
        media: {
            mimeType: "image/" + total[0],
            body: Readable.from(fileBuffer),
        },

    });
    return res.data.id;
}
