'use client'
import { Badge, Button, Card, Modal, Spinner, TextInput } from "flowbite-react";
import { ChangeEvent, useState } from "react"
import KotobankRepository from "@/api/KotobankRepository";
import GooRepository from "@/api/GooRepository";
import WikipediaRepository from "@/api/WikipediaRepository";
import { Word } from "@/app/types";
import AddCollectionModal from "@/components/AddCollectionModal";
import { HiOutlineBookmark } from "react-icons/hi";
import { useHistoryState } from "../state/historyState";
import WeblioRepository from "@/api/WeblioRepository";


export default function Search() {
  const [condition, setCondition] = useState<string>('');
  const [searchHistory, setSearchHistory] = useHistoryState();
  const [result, setResult] = useState<Array<Word>>([]);
  const [similarWords, setSimilarWords] = useState<Array<string>>([]);
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

  async function doSearch(searchText: string): Promise<void> {
    if (!searchText) return;
    // Spinner描画
    setIsSearching(true);

    // 検索結果を初期化
    setResult([]);

    // 履歴追加
    if (!searchHistory.some(item => item === searchText)) {
      const newHistories = [searchText, ...searchHistory];
      if (newHistories.length > 10) newHistories.pop();
      setSearchHistory(newHistories);
    }

    const kotobankResult = new KotobankRepository().search(searchText);
    const gooResult = new GooRepository().search(searchText);
    const wikipediaResult = new WikipediaRepository().search(searchText);
    const weblioResult = new WeblioRepository().searchThesaurus(searchText);

    const searchResults = await Promise.all([kotobankResult, gooResult, wikipediaResult]);
    console.log(searchResults);

    setResult(searchResults);

    weblioResult.then(res => {
      console.log("res");
      console.log(res);

      setSimilarWords(res);
    })
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
          {searchHistory.length > 0 && (
            <div>
              <p className="mt-2 text-sm">検索履歴</p>
              <div className="flex flex-wrap">
                {
                  searchHistory.map((word) => {
                    return (
                      <Badge key={word} className="m-1" onClick={() => onClickHistory(word)} color="gray">
                        <a className="text-gray-600">{word}</a>
                      </Badge>
                    )
                  })
                }
              </div>
            </div>
          )}
        </Card >
        <Card className="mt-5">
          {
            result.filter(item => item.dictionary).length > 0 ? (
              <>
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
                                <p className="break-all text-sm">{item.meaning}</p>
                              </div>
                              <div className="flex-none w-16">
                                <a className="dictionary-link" href={item.url} target="_blank">{item.dictionary}</a>
                                <a onClick={() => onClickAddCollectionButton(item)}>
                                  <HiOutlineBookmark className={"mt-2"} size={20} />
                                </a>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </>
            ) : <>
              {isSearching ? (<Spinner></Spinner>) : (<>検索結果がありません</>)}
            </>
          }
          {
            similarWords.length > 0 && (
              <div className="mt-2">
                <p className="text-sm">もしかして </p>
                <div className="flex flex-wrap">
                  {
                    similarWords.map((word) => {
                      return (
                        <Badge key={word} className="m-1 bg-white" onClick={() => onClickHistory(word)} >
                          <a className="">{word}</a>
                        </Badge>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
        </Card>
      </div >
      <AddCollectionModal targetWord={addCollectionTargetWord} showModal={showModal} setShowModal={setShowModal}></AddCollectionModal>
    </>
  )
}
