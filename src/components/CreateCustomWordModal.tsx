import { Modal, Button, TextInput, Label } from "flowbite-react"
import { Dispatch, SetStateAction, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

type Props = {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    doCreate: (customWord: { word: string, meaning: string }) => void
}


export function CreateCustomWordModal({ showModal, setShowModal, doCreate }: Props) {
    const [inputWord, setInputWord] = useState<string>("");
    const [inputMeaning, setInputMeaning] = useState<string>("");

    function onClickCreateButton() {
        doCreate({ word: inputWord, meaning: inputMeaning });

        setInputWord("");
        setInputMeaning("");
    }

    return <>
        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div>
                    <p className="text-xl font-bold">
                        新しい言葉を定義
                    </p>
                    <div className="block mt-2">
                        <Label htmlFor="input-word" value="単語" />
                    </div>
                    <TextInput className="mt-2" value={inputWord} onChange={(e) => setInputWord(e.target.value)}></TextInput>
                    <div className="block mt-2">
                        <Label htmlFor="input-meaning" value="意味" />
                    </div>
                    <TextInput className="mt-2" value={inputMeaning} onChange={(e) => setInputMeaning(e.target.value)}></TextInput>
                    <Button className="mt-2" onClick={onClickCreateButton}>
                        作成
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}