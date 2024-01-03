/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ListGroup, Modal, Textarea } from "flowbite-react"
import { Word } from "../app/types"
import { useRecoilState } from "recoil";
import WordCard from "./WordCard";
import { useCollectionState } from "@/state/collectionState";
import { ChangeEvent, useState } from "react";

interface PageProps {
    targetWord: Word,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function collectionDetailComponent({ targetWord, showModal, setShowModal }: PageProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collections, setCollections] = useCollectionState();
    const [remarks, setRemarks] = useState('');

    function onCollectionClick(collectionId: string | undefined): void {
        if (!collectionId || !targetWord) return;

        // 備考追加
        targetWord.remarks = remarks;

        collections.map(coll => {
            if (coll.id === collectionId) {
                coll.words?.push(targetWord);
            }
            return coll;
        });
        setCollections(collections);
        setShowModal(false);
    }

    function onRemarksChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setRemarks(event.target.value);
    }

    return (
        <>
            <Modal show={showModal} size="lg" onClose={() => setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    {
                        <div>
                            <WordCard targetWord={targetWord}></WordCard>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                    }
                    <p>メモ</p>
                    <Textarea value={remarks} onChange={onRemarksChange}></Textarea>
                    <p>追加するコレクション</p>
                    <div className="flex justify-center mt-2">
                        <ListGroup className="w-full">
                            {
                                collections.map(coll => {
                                    return <ListGroup.Item key={coll.id} onClick={() => onCollectionClick(coll.id)}>
                                        {coll.name}
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                </Modal.Body >
            </Modal >
        </>
    )
}

