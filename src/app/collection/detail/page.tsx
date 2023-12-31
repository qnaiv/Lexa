'use client'

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
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                targetCollection?.words?.filter(item => item.meaning).map(item => {
                                    return (
                                        <li key={item.dictionary} className="py-3 sm:py-4">
                                            <div className="font-bold">{item.word}</div>
                                            <div className="flex space-x-4">
                                                <div className="flex-1">
                                                    <p className="break-all">{item.meaning}</p>
                                                </div>
                                                <div className="flex-none w-16">
                                                    <a href={item.url} target="_blank">{item.dictionary}</a>
                                                </div>
                                            </div>
                                        </li>
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

