import { DICTIONARY, PROXY_URL } from '@/app/consts';
import * as cheerio from 'cheerio';

export default class WikipediaRepository {
    constructor() {

    }
    MAX_MEANING_LENGTH = 500;


    url = 'https://ja.wikipedia.org/wiki/';

    async search(query: string): Promise<any> {
        const searchUrl = this.url + query;

        const response = await fetch(PROXY_URL + searchUrl);

        if (response.status !== 200) {
            return {
            }
        }

        const $ = cheerio.load(await response.text());

        // 不要な情報ボックスを削除
        $('table.infobox').remove();
        let meaning = $('p').text();
        if (meaning.length > this.MAX_MEANING_LENGTH) {
            meaning = meaning.substring(0, 300) + '...';
        }

        return {
            id: query + DICTIONARY.WIKIPEDIA,
            word: query,
            meaning,
            url: searchUrl,
            dictionary: DICTIONARY.WIKIPEDIA,
        }
    }
}