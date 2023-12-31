'use client'

import WordCard from "@/app/components/WordCard";
import { collectionState } from "@/app/state/collectionState";
import { Collection } from "@/app/types";
import { Card } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";


export default function collectionDetailComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const collectionId = useSearchParams().get('collection');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collections, setCollections] = useRecoilState(collectionState);
    const targetCollection: Collection | undefined = collections.find((coll: Collection) => coll.id === collectionId);

    function onClickAddButton(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <div className="container mx-auto md:w-8/12 sm:w-full">
                <Card className="mt-5">
                    <p className="text-xl font-bold">{targetCollection?.name}</p>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                targetCollection?.words?.filter(item => item.meaning).map(item => {
                                    return (
                                        <div key={item.id} className="mb-5">
                                            <WordCard targetWord={item}></WordCard>
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

