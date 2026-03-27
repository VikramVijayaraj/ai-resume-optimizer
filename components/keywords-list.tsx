"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface KeywordsListProps {
  keywords: string[];
  onSubmit: (items: string[]) => void;
}

export default function KeywordsList({
  keywords,
  onSubmit,
}: KeywordsListProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedKeywords);
  }, [selectedKeywords]);

  function handleSelect(keyword: string) {
    if (selectedKeywords.includes(keyword)) {
      const filtered = selectedKeywords.filter((k) => k !== keyword);
      setSelectedKeywords(filtered);
    } else {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
  }

  if (keywords.length === 0) {
    return <p>No missing keywords found.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Missing Keywords:</h2>
        <div>
          <Button
            variant="outline"
            className="text-green-700 cursor-pointer"
            onClick={() => setSelectedKeywords(keywords)}
          >
            Add all
          </Button>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => setSelectedKeywords([])}
          >
            Clear
          </Button>
        </div>
      </div>

      <p className="text-sm">
        Select keywords to include in your optimized resume:
      </p>

      <ul className="space-y-2 grid grid-cols-3">
        {keywords.map((keyword, index) => (
          <li
            key={index}
            onClick={() => handleSelect(keyword)}
            className={`cursor-pointer ${selectedKeywords.includes(keyword) ? "bg-green-100 border border-green-300" : ""} rounded-full px-2 py-1 w-fit`}
          >
            {keyword}
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <Button
          onClick={() => onSubmit(selectedKeywords)}
          className="w-full text-lg cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
