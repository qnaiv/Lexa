export const DICTIONARY = {
    KOTOBANK: 'コトバンク',
    GOO: 'goo辞書',
    WIKIPEDIA: 'Wikipedia',
    WEBLIOEJJE: 'Weblio英和和英',
    ORIGINAL: 'カスタム',
} as const;

export const PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL ?? '';