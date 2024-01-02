'use client'
import { Card } from "flowbite-react";
import { Word } from "@/app/types";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type Props = {
    isEditable?: boolean,
    targetWord: Word,
    onDelete?: () => void
}


export default function WordCard({ isEditable, targetWord, onDelete }: Props) {
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
        <Card className="bg-neutral-50 w-full">
            <div className="flex justify-end items-center">
                <p className="text-md mr-auto">
                    {targetWord.word}
                </p>
                {
                    isEditable ?
                        (<a onClick={onDeleteClick}>
                            <HiOutlineTrash></HiOutlineTrash>
                        </a>)
                        : (<></>)
                }

            </div>
            <p className="text-sm">
                {targetWord.meaning}
            </p>
            <p className="mr-2 text-right">
                {
                    targetWord.url ? (
                        <a className="dictionary-link" href={targetWord.url} target="_blank">
                            {targetWord.dictionary}
                        </a>

                    ) : (
                        <p>{targetWord.dictionary}</p>
                    )
                }
            </p>
        </Card>
        <ConfirmDeleteModal showModal={showModal} setShowModal={setShowModal} doDelete={doDelete} />
    </>
}