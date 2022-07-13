import React, { useEffect, useState } from 'react'
import Slider from '../../components/slider'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { Chapter } from '@prisma/client'
import { server } from '../../config'

export async function getServerSideProps({ params }: { params: any }) {
  const data = await (
    await fetch(server + '/api/chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: params.slug,
      }),
    })
  ).json()
  return {
    props: {
      prefetch: data.chapter,
    },
  }
}

function Chapter({ prefetch }: { prefetch: Chapter }) {
  const [chapter, setChapter] = useState<Chapter>(prefetch)
  const [fontSize, setFontSize] = useState(50)
  const slug = useRouter().query.slug

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
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Chapter
