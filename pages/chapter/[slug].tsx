import React, { useEffect } from 'react'
import Slider from '../../components/slider'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { Chapter } from '@prisma/client'
function chapter() {
  const [chapter, setChapter] = React.useState<Chapter>({
    title: 'Loading...',
    content: 'Loading...',
    id: 0,
    translatorId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: '',
  })
  const [fontSize, setFontSize] = React.useState(50)
  const slug = useRouter().query.slug
  useEffect(() => {
    fetch('/api/chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: slug,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChapter(data.chapter)
      })
  }, [])
  return (
    <>
      <div className="w-full h-full dark:bg-gray-900 bg-gray-100 min-h-screen ">
        <div className=" max-w-[1000px] mx-auto pt-[80px] ">
          <Slider onChange={setFontSize}></Slider>

          <div
            style={{ fontSize: `${fontSize}px` }}
            className="p-5 dark:text-white text-black"
          >
            {chapter?.content &&
              chapter?.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  <p>{line}</p>
                  <br />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default chapter
