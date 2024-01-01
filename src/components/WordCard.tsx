'use client'
import { Button, Card, Modal } from "flowbite-react";
import { Word } from "@/app/types";
import { HiDotsHorizontal, HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

type Props = {
    targetWord: Word,
    onDelete?: () => void
}


export default function WordCard({ targetWord, onDelete }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function onDeleteClick() {
        setShowModal(true);
    }

    function doDelete() {
        setShowModal(false);
        if (!onDelete) return;
        onDelete();

    }
    return <>
        <Card className="bg-neutral-50">
            <div className="flex justify-end items-center">
                <p className="text-md mr-auto">
                    {targetWord.word}
                </p>
                <div>
                    <HiOutlineTrash onClick={onDeleteClick}></HiOutlineTrash>
                </div>

            </div>
            <p className="text-sm">
                {targetWord.meaning}
            </p>
            <p className="mr-2 text-right">
                <a className="dictionary-link" href={targetWord.url} target="_blank">
                    {targetWord.dictionary}
                </a>
            </p>
        </Card>
        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        削除してもよろしいですか？
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={doDelete}>
                            Yes
                        </Button>
                        <Button color="gray" onClick={() => setShowModal(false)}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}