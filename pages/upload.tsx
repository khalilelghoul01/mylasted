import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect } from 'react'

function upload() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, status])
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const content = e.target?.content.value
    const title = e.target?.title.value
    const resp = await fetch('/api/addChapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, title }),
    })
    //reset form
    e.target?.reset()
  }

  return (
    <>
      <div className="w-full h-full dark:bg-gray-900 bg-gray-100 min-h-screen ">
        <div className="max-w-[1000px] mx-auto pt-[80px] ">
          <h1 className="text-3xl text-black dark:text-white p-5 font-bold w-full md:text-center">
            Add a chapter
          </h1>
          <form
            className="w-full h-full flex flex-col space-y-10 justify-center items-center pb-10"
            onSubmit={handleFormSubmit}
          >
            <label className="block text-gray-900 dark:text-gray-100 text-xl font-bold mb-5">
              Title:
              <input
                type="text"
                name="title"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label className="block text-gray-900 dark:text-gray-100 text-xl font-bold mb-5">
              Content:
              <textarea
                name="content"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline h-80 "
              />
            </label>
            <button
              type="submit"
              className="py-2 px-3 border rounded-full text-black dark:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default upload
