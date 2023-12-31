'use client'
import { Button, Card, Modal, TextInput } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import { Collection } from "./types";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { collectionState } from "../state/collectionState";

export default function Collection() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [collectionInputText, setCollectionInputText] = useState<string>('');
    const [collections, setCollections] = useRecoilState(collectionState);

    function onClickAddButton(): void {
        setShowModal(true);
    }

    function onChangeCollectionInput(event: ChangeEvent<HTMLInputElement>): void {
        setCollectionInputText(event.target.value);
    }

    function onClickOkButton(): void {
        setCollections([...collections, { id: crypto.randomUUID(), name: collectionInputText, words: [] }]);
        setCollectionInputText('');
        setShowModal(false);
    }

    return (
        <>
            <div className="container mx-auto md:w-8/12 sm:w-full">
                <Card className="mt-5">
                    <div className="flex justify-between">
                        <p>
                            コレクション
                        </p>
                        <a onClick={onClickAddButton}>
                            + 新規
                        </a>
                    </div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            collections.map(item => {
                                return (
                                    <li key={item.id} className="py-3 sm:py-4">
                                        <div className="flex space-x-4">
                                            <div className="flex-1">
                                                <Link href={`collection/${item.id}`}>{item.name}</Link>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Card>
            </div>
            <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    コレクション名
                    <TextInput value={collectionInputText} onChange={onChangeCollectionInput} className="mb-2"></TextInput>
                    <Button onClick={onClickOkButton}>検索</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
