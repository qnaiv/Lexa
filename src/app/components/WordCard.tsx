import { Card } from "flowbite-react";
import { Word } from "@/app/types";

type Props = {
    targetWord: Word
}

export default function WordCard({ targetWord }: Props) {
    return <>
        <Card className="bg-neutral-50">
            <div className="flex justify-between">
                <p className="text-md">
                    {targetWord.word}
                </p>
                <a className="dictionary-link" href={targetWord.url} target="_blank">
                    {targetWord.dictionary}
                </a>

            </div>
            <p className="text-sm">
                {targetWord.meaning}
            </p>
        </Card>
    </>
}