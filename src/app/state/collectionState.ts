import { AtomEffect, SetterOrUpdater, atom, useRecoilState } from "recoil";
import { Collection } from "../types";
import React, { useState } from "react";

const localStorageEffect: (key: string) => AtomEffect<any> = (key: string) => ({ setSelf, onSet }) => {
    if (typeof window == 'undefined') {
        return
    }
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const collectionState = atom<Collection[]>({
    key: 'collectionState',
    default: [],
    dangerouslyAllowMutability: true,
    effects: [localStorageEffect('collectionState')],
});

export function useCollectionState(): [Collection[], SetterOrUpdater<Collection[]>] {
    const [didMount, setDidMount] = useState(false);
    const [collections, setCollections] = useRecoilState(collectionState)

    React.useEffect(() => {
        setDidMount(true);
    }, []);

    return [
        didMount ? collections : [],
        setCollections
    ]
}