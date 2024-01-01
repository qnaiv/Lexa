import { AtomEffect, SetterOrUpdater, atom, selector, useRecoilState } from "recoil";
import { Collection, Word } from "../app/types";
import React, { useState } from "react";
import { localStorageEffect } from "./stateUtil";

export class CollectionEntity {
    constructor(collectionState: Collection) {
        this.id = collectionState.id;
        this.name = collectionState.name;
        this.words = collectionState.words;
    }

    id?: string;
    name?: string;
    words?: Array<Word>;

    addWord(word: Word) {
        if (!this.words) {
            return;
        };
        this.words.push(word);
    }

    deleteWord(wordId: string) {
        if (!this.words) {
            return;
        };
        this.words = this.words.filter(word => word.id !== wordId);
    }

}

const collectionState = atom<Collection[]>({
    key: 'collectionState',
    default: [],
    dangerouslyAllowMutability: true,
    effects: [localStorageEffect('collectionState')],
});

const collectionSelector = selector({
    key: 'collectionEntity',
    dangerouslyAllowMutability: true,
    get: ({ get }) => {
        const collections = get(collectionState);
        return collections.map(item => new CollectionEntity(item));
    },
    set: ({ set }, newValue) => {
        set(collectionState, newValue);
    },
})

export function useCollectionState(): [CollectionEntity[], SetterOrUpdater<CollectionEntity[]>] {
    const [didMount, setDidMount] = useState(false);
    const [collections, setCollections] = useRecoilState(collectionSelector)

    React.useEffect(() => {
        setDidMount(true);
    }, []);

    return [
        didMount ? collections : [],
        setCollections
    ]
}