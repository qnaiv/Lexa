/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import WordCard from "@/components/WordCard";
import { Collection } from "@/app/types";
import { Card } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { useCollectionState } from "@/state/collectionState";
import { useRouter } from "next/navigation";


export default function collectionDetailComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const collectionId = useSearchParams().get('collection');

    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collections, setCollections] = useCollectionState();
    const targetCollection: Collection | undefined = collections.find((coll: Collection) => coll.id === collectionId);

    function onClickCollectionDeleteButton(): void {
        if (!collectionId) return;
        setCollections(collections.filter(coll => coll.id !== collectionId));
        router.push('/collection');
    }

    function onDelete(wordId: string | undefined): void {
        if (!collectionId || !wordId) return;

        const newCollections = collections.map(coll => {
            if (coll.id === collectionId) {
                coll.words = coll.words?.filter(word => word.id !== wordId);
            }
            return coll;
        });

        setCollections(newCollections);
    }

    return (
        <>
            <div className="container mx-auto md:w-8/12 sm:w-full">
                <Card className="mt-5">
                    <div className="flex justify-between">
                        <p className="text-xl font-bold">{targetCollection?.name}</p>
                        <div onClick={onClickCollectionDeleteButton}>
                            <HiOutlineTrash></HiOutlineTrash>
                        </div>
                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                targetCollection?.words?.filter(item => item.meaning).map(item => {
                                    return (
                                        <div key={item.id} className="mb-5 flex justify-between">
                                            <WordCard targetWord={item} onDelete={() => onDelete(item.id)}></WordCard>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Card>
            </div>
        </>
    )
}

