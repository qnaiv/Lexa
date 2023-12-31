'use client'

import { Card, ListGroup, Modal } from "flowbite-react"
import { Word } from "../types"
import { useRecoilState } from "recoil";
import { collectionState } from "../state/collectionState";

interface PageProps {
    targetWord: Word,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function collectionDetailComponent({ targetWord, showModal, setShowModal }: PageProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collections, setCollections] = useRecoilState(collectionState);

    function onCollectionClick(collectionId: string | undefined): void {
        if (!collectionId) {
            console.log('error!');
            return;
        }

        const newCollections = collections.map((coll) => {
            if (!coll.words) return coll;

            if (coll.id === collectionId) {
                const newWords = [...coll.words];
                newWords.push(targetWord);
                coll.words = newWords
            }
            return coll;
        });

        setCollections(newCollections);
        setShowModal(false);
    }

    return (
        <>
            <Modal show={showModal} size="lg" onClose={() => setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    {
                        <div>
                            <Card className="bg-neutral-50">
                                {/* <h1 className="text-xl">
                                    {targetWord.word}
                                </h1> */}
                                {/* <h3 className="text-sm text-slate-500"> */}
                                <h3 className="text-sm">
                                    {targetWord.dictionary}
                                </h3>
                                <p className="text-xs">
                                    {targetWord.meaning}
                                </p>

                            </Card>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                    }
                    <p>追加するコレクション</p>
                    <div className="flex justify-center">
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
                </Modal.Body>
            </Modal >
        </>
    )
}

