import { DICTIONARY, PROXY_URL } from '@/app/consts';
import { Word } from '@/app/types';
import * as cheerio from 'cheerio';

export default class GooRepository {
    constructor() {

    }

    url = 'https://dictionary.goo.ne.jp/word/';

    trashTexts = [
        '意味や使い方、類語をわかりやすく解説。',
        ' - goo国語辞書は30万9千件語以上を収録。政治・経済・医学・ITなど、最新用語の追加も定期的に行っています。',
    ]

    async search(query: string): Promise<Word> {
        const searchUrl = this.url + query;

        const response = await fetch(PROXY_URL + searchUrl);

        if (response.status !== 200) {
            return {
            }
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        let meaning = $('meta[name="description"]').attr('content');

        this.trashTexts.forEach(trashText => {
            meaning = meaning?.replace(trashText, '');
        });

        return {
            id: query + DICTIONARY.GOO,
            word: query,
            meaning,
            url: searchUrl,
            dictionary: DICTIONARY.GOO,
        }
    }
}