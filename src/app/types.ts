
export type Word = {
    word?: string,
    meaning?: string,
    url?: string,
    dictionary?: string,

}

export type Collection = {
    id?: string,
    name?: string,
    words?: Array<Word>,
}