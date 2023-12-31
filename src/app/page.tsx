'use client'
import { Button, Card, Modal, Spinner, TextInput } from "flowbite-react";
import { ChangeEvent, useState } from "react"
import KotobankRepository from "@/repository/KotobankRepository";
import GooRepository from "@/repository/GooRepository";
import WikipediaRepository from "@/repository/WikipediaRepository";
import { Word } from "@/app/types";
import AddCollectionModal from "@/app/components/AddCollectionModal";


export default function Search() {
  const [condition, setCondition] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const [result, setResult] = useState<Array<Word>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addCollectionTargetWord, setAddCollectionTargetWord] = useState<Word>({});



  function onChangeCondition(event: ChangeEvent<HTMLInputElement>): void {
    setCondition(event.target.value);
  }

  async function onClickSearchButton(): Promise<void> {
    doSearch(condition);
  }

  function onClickHistory(word: string): void {
    setCondition(word);
    doSearch(word);
  }

  async function doSearch(seearchText: string): Promise<void> {
    // Spinner描画
    setIsSearching(true);

    // 検索結果を初期化
    setResult([]);

    // 履歴追加
    if (!searchHistory.some(item => item === seearchText)) {
      setSearchHistory([...searchHistory, seearchText]);
    }

    const kotobankResult = new KotobankRepository().search(seearchText);
    const gooResult = new GooRepository().search(seearchText);
    const wikipediaResult = new WikipediaRepository().search(seearchText);

    const searchResults = await Promise.all([kotobankResult, gooResult, wikipediaResult]);
    setResult(searchResults);
    setIsSearching(false);

  }

  function onClickAddCollectionButton(word: Word): void {
    setAddCollectionTargetWord(word);
    setShowModal(true);
  }

  return (
    <>

      <div className="container mx-auto md:w-8/12 sm:w-full mb-5">
        <Card className="mt-5">
          <TextInput value={condition} onChange={onChangeCondition}></TextInput>
          <Button onClick={onClickSearchButton}>検索</Button>
        </Card>
        {
          result.length > 0 ? (
            <Card className="mt-5">
              検索結果
              {isSearching ? (<Spinner></Spinner>) : (<></>)}
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    result.filter(item => item.meaning).map(item => {
                      return (
                        <li key={item.dictionary} className="py-3 sm:py-4">
                          <div className="flex space-x-4">
                            <div className="flex-1">
                              <p className="break-all">{item.meaning}</p>
                            </div>
                            <div className="flex-none w-16">
                              <a href={item.url} target="_blank">{item.dictionary}</a>
                              <p onClick={() => onClickAddCollectionButton(item)}>追加</p>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </Card>
          ) : <>
            <Card className="mt-5">
              {isSearching ? (<Spinner></Spinner>) : (<>検索結果がありません</>)}
            </Card>
          </>
        }
        {
          searchHistory.length > 0 ? (
            <Card className="mt-5">
              検索履歴
              {
                searchHistory.map((word) => {
                  return <p key={word} onClick={() => onClickHistory(word)}>{word}</p>
                })
              }
            </Card>

          ) : <></>
        }
      </div>
      <AddCollectionModal targetWord={addCollectionTargetWord} showModal={showModal} setShowModal={setShowModal}></AddCollectionModal>
    </>
  )
}
