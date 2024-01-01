import { SetterOrUpdater, atom, useRecoilState } from "recoil";
import React, { useState } from "react";
import { localStorageEffect } from "./stateUtil";

export const historyState = atom<string[]>({
    key: 'historyState',
    default: [],
    dangerouslyAllowMutability: true,
    effects: [localStorageEffect('historyState')],
});

export function useHistoryState(): [string[], SetterOrUpdater<string[]>] {
    const [didMount, setDidMount] = useState(false);
    const [histories, setHistories] = useRecoilState(historyState)

    React.useEffect(() => {
        setDidMount(true);
    }, []);

    return [
        didMount ? histories : [],
        setHistories
    ]
}