import { Chapter } from '@prisma/client'
import type { NextPage } from 'next'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useEffect, useState } from 'react'
import ChapterCard from '../components/ChapterCard'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  const router = useRouter()
  const [chapters, setChapters] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    fetch('/api/tenChapters')
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters)
      })
  }, [])
  return (
    <>
      <div className="w-full h-full dark:bg-gray-900 bg-gray-100 min-h-screen ">
        <div className="max-w-[1000px] mx-auto pt-[80px]">
          <h1 className="text-3xl text-black dark:text-white p-5 font-bold">
            Latest chapters
          </h1>
          {chapters.map((chapter: Chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
