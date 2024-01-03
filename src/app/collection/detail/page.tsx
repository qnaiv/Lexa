/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import WordCard from "@/components/WordCard";
import { Collection, Word } from "@/app/types";
import { Card, Modal } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import { useCollectionState } from "@/state/collectionState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { CreateCustomWordModal } from "@/components/CreateCustomWordModal";


export default function collectionDetailComponent() {
    const router = useRouter();

    const collectionId = useSearchParams().get('collection');

    const [collections, setCollections] = useCollectionState();
    const [showCollectionDeleteModal, setShowCollectionDeleteModal] = useState<boolean>(false);
    const [showCreateCustomWordModal, setShowCreateCustomWordModal] = useState<boolean>(false);
    const [showRemarksModal, setShowRemarksModal] = useState<boolean>(false);
    const [targetWord, setTargetWord] = useState<Word | undefined>(undefined);
    const targetCollection: Collection | undefined = collections.find((coll: Collection) => coll.id === collectionId);

    function onClickCollectionDeleteButton(): void {
        setShowCollectionDeleteModal(true);
    }

    function onCollectionDelete() {
        if (!collectionId) return;
        setCollections(collections.filter(coll => coll.id !== collectionId));
        router.push('/collection');

    }

    function onWordDelete(wordId: string | undefined): void {
        if (!collectionId || !wordId) return;

        const newCollections = collections.map(coll => {
            if (coll.id === collectionId) {
                coll.deleteWord(wordId);
            }
            return coll;
        });

        setCollections(newCollections);
    }

    function onClickCreateCustomWordButton(): void {
        setShowCreateCustomWordModal(true);
    }

    function onCreateCustomWord({ word, meaning }: { word: string, meaning: string }): void {

        if (!collectionId) return;
        const newCollections = collections.map(coll => {
            if (coll.id === collectionId) {
                coll.addWord({
                    id: crypto.randomUUID(),
                    dictionary: 'オリジナル',
                    word,
                    meaning,
                    url: ''
                });
            }
            return coll;
        });
        setCollections(newCollections);
        setShowCreateCustomWordModal(false);
    }

    function onClickRemarks(word: Word): void {
        setShowRemarksModal(true);
        setTargetWord(word);
    }

    return (
        <>
            <div className="container mx-auto md:w-8/12 sm:w-full">
                <Card className="mt-5">
                    <div className="flex justify-left items-center">
                        <p className="text-xl font-bold">{targetCollection?.name}</p>
                        <div className="ml-5">
                            <a onClick={onClickCreateCustomWordButton}>
                                <HiOutlinePlusCircle size={20}></HiOutlinePlusCircle>
                            </a>
                        </div>
                        <div className="ml-auto">
                            <a onClick={onClickCollectionDeleteButton}>
                                <HiOutlineTrash size={20}></HiOutlineTrash>
                            </a>
                        </div>
                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                targetCollection?.words?.filter(item => item.meaning).map(item => {
                                    return (
                                        <div key={item.id} className="mb-5 flex justify-between">
                                            <WordCard isEditable={true} targetWord={item} onDelete={() => onWordDelete(item.id)} onClickRemarks={() => onClickRemarks(item)}></WordCard>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Card>
            </div>
            <ConfirmDeleteModal showModal={showCollectionDeleteModal} setShowModal={setShowCollectionDeleteModal} doDelete={onCollectionDelete} />
            <CreateCustomWordModal showModal={showCreateCustomWordModal} setShowModal={setShowCreateCustomWordModal} doCreate={onCreateCustomWord} />
            <Modal show={showRemarksModal} size="md" onClose={() => setShowRemarksModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div>
                        {targetWord?.remarks}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

