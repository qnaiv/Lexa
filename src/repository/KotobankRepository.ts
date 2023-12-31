import { DICTIONARY, PROXY_URL } from '@/app/consts';
import * as cheerio from 'cheerio';

export default class KotobankRepository {
    constructor() {

    }

    url = 'https://kotobank.jp/word/';

    async search(query: string): Promise<any> {
        const searchUrl = this.url + query;

        const response = await fetch(PROXY_URL + searchUrl);

        if (response.status !== 200) {
            return {
                word: query,
                url: searchUrl,
                dictionary: DICTIONARY.KOTOBANK,
            }
        }

        const $ = cheerio.load(await response.text());
        let meaning = $('meta[name="description"]').attr('content');

        return {
            word: query,
            meaning,
            url: searchUrl,
            dictionary: DICTIONARY.KOTOBANK,
        }
    }
}