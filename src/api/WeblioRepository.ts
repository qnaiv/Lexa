import { DICTIONARY, PROXY_URL } from '@/app/consts';
import * as cheerio from 'cheerio';

export default class WeblioRepository {
    constructor() {

    }

    url = 'https://thesaurus.weblio.jp/content/';

    async searchThesaurus(query: string): Promise<any> {
        const searchUrl = this.url + query;

        const response = await fetch(PROXY_URL + searchUrl);

        if (response.status !== 200) {
            return {

            }
        }

        const $ = cheerio.load(await response.text());

        const similarWordElms = $('.nrCntNbKw a');
        if (!similarWordElms) {
            return;
        }
        const similarWords = similarWordElms.toArray().map((elm) => $(elm).text());

        return similarWords;
    }
}