import { DICTIONARY, PROXY_URL } from '@/app/consts';
import * as cheerio from 'cheerio';

export default class WeblioApi {
    constructor() {

    }

    thesaurusUrl = 'https://thesaurus.weblio.jp/content/';
    ejjeUrl = 'https://ejje.weblio.jp/content/';

    async ejjeSearch(query: string): Promise<any> {
        const searchUrl = this.ejjeUrl + query;
        const response = await fetch(PROXY_URL + searchUrl);
        // 正常なレスポンスが返ってこなかった場合は終了
        if (response.status !== 200) {
            return {

            }
        }

        const $ = cheerio.load(await response.text());
        const explanationElm = $('.content-explanation');
        const explanationMobileElm = $('.explanation');

        // PCでもモバイルでも説明欄が存在しない場合は終了
        if (!explanationElm && !explanationMobileElm) {
            return;
        }

        return {
            id: query + DICTIONARY.WEBLIOEJJE,
            word: query,
            meaning: explanationElm.text() || explanationMobileElm.text(),
            url: searchUrl,
            dictionary: DICTIONARY.WEBLIOEJJE,
        };
    }

    async searchThesaurus(query: string): Promise<any> {
        const searchUrl = this.thesaurusUrl + query;

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