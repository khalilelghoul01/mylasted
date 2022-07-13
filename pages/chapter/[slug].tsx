import React, { useEffect, useState } from 'react'
import Slider from '../../components/slider'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { Chapter } from '@prisma/client'
import { server } from '../../config'
import { getAllChapters } from '../../db/chapters'
import Script from 'next/script'

export async function getStaticPaths() {
  const chapters = await getAllChapters()
  return {
    paths: chapters.map((chapter) => ({
      params: { slug: chapter.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
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
  const pageurl = useRouter().asPath
  return (
    <>
      <div className="w-full h-full dark:bg-gray-900 bg-gray-100 min-h-screen ">
        <div className=" max-w-[1000px] mx-auto pt-[80px] ">
          <Slider onChange={setFontSize}></Slider>
          <h1 className="text-3xl md:text-5xl text-black dark:text-white p-5 font-bold mt-3">
            {chapter.title}
          </h1>

          <div
            style={{ fontSize: `${fontSize}px` }}
            className="p-5 dark:text-white text-black min-h-[500px]"
          >
            {chapter?.content &&
              chapter?.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  <p className="pb-2">{line}</p>
                </React.Fragment>
              ))}
          </div>
          <div id="disqus_thread" className="p-5"></div>
        </div>
        <Script>
          {`/**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    
    var disqus_config = function () {
    this.page.url = document.location.href;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = new URL(document.URL).pathname; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://mylasted.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();`}
        </Script>
      </div>
    </>
  )
}

export default Chapter
