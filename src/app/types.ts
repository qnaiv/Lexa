
export type Word = {
    id?: string,
    word?: string,
    meaning?: string,
    url?: string,
    dictionary?: string,
    remarks?: string,
}

export type Collection = {
    id?: string,
    name?: string,
    words?: Array<Word>,
}