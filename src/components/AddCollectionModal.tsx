'use client'

import { ListGroup, Modal } from "flowbite-react"
import { Word } from "../app/types"
import { useRecoilState } from "recoil";
import WordCard from "./WordCard";
import { useCollectionState } from "@/state/collectionState";

interface PageProps {
    targetWord: Word,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function collectionDetailComponent({ targetWord, showModal, setShowModal }: PageProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collections, setCollections] = useCollectionState();

    function onCollectionClick(collectionId: string | undefined): void {
        if (!collectionId || !targetWord) return;

        collections.map(coll => {
            if (coll.id === collectionId) {
                coll.words?.push(targetWord);
            }
            return coll;
        });
        setCollections(collections);
        setShowModal(false);
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

