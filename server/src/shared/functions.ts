import logger from 'jet-logger';
import axios from 'axios';

/**
 * Print an error object if it's truthy. Useful for testing.
 * 
 * @param err 
 */
export function pErr(err?: Error): void {
    if (!!err) {
        logger.err(err);
    }
}


/**
 * Get a random number between 1 and 1,000,000,000,000
 * 
 * @returns 
 */
export function getRandomInt(): number {
    return Math.floor(Math.random() * 1_000_000_000_000);
}
const url = "https://freeimage.host/json";
export async function uploadImage(image: Blob): Promise<string> {
    const form = new FormData();
    form.append('source', image);
    form.append('type', 'file');
    form.append('action', 'upload');
    form.append('timestamp', '1656833558090');
    form.append('auth_token', '7a85187d637bab53cd4d45169d9ce47ac233e2fe');
    form.append('nsfw', '0');


    const res = await axios.post(url, form)
    return res.data.image.url as string;
}

