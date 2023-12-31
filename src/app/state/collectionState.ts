import { atom } from "recoil";
import { Collection } from "../types";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const collectionState = atom<Collection[]>({
    key: 'collectionState',
    default: [],
    dangerouslyAllowMutability: true,
    effects_UNSTABLE: [persistAtom],
});