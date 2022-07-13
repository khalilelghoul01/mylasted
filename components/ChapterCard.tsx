import { Chapter } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const router = useRouter()

  const maxLength = 200

  const truncate = (str: string) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    }
    return str
  }

  const converDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <a href={`/chapter/${chapter.slug}`}>
      <a className="p-5 dark:bg-[#0a0e16] bg-white rounded-lg mt-5 mx-2 flex flex-col items-center hover:scale-105 ease-in-out duration-700">
        <h1 className="p-2 font-bold text-3xl text-black dark:text-white">
          {chapter.title}
        </h1>
        <span className="p-2 text-gray-600 dark:text-gray-400">
          {converDate(chapter.createdAt)}
        </span>
        <p className="text-xl text-black dark:text-white p-5">
          {truncate(chapter.content)}
        </p>

        <button
          onClick={() => {
            router.push(`/chapter/${chapter.slug}`)
          }}
          className="p-5 py-2  border rounded-full text-black dark:text-white w-fit  hover:scale-105 ease-in-out duration-700 hover:dark:bg-slate-900 hover:bg-gray-100"
        >
          Read more
        </button>
      </a>
    </a>
  )
}

export default ChapterCard
