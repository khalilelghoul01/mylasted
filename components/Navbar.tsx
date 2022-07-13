import React, { useEffect, useState } from 'react'
import logo from '../public/images/logo.png'
import { MdMenu, MdClose } from 'react-icons/md'
import { BsCoin, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

function Navbar({ toggleTheme }: { toggleTheme: (dark: boolean) => void }) {
  const router = useRouter()
  const { data: session } = useSession()
  const getLocalStorage = () => {
    let item = null
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      item = localStorage.getItem('dark')
      console.log(item)
    }
    if (item) {
      return item === 'true'
    }
    return false
  }

  const setLocalStorage = (value: boolean) => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorage.setItem('dark', value.toString())
    }
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setisDark] = useState(getLocalStorage() ?? false)
  const toggle = () => setIsOpen(!isOpen)
  const toggleDark = () => {
    setisDark(!isDark)
    setLocalStorage(!isDark)
  }
  useEffect(() => {
    toggleTheme(isDark)
    setLocalStorage(isDark)
  }, [isDark])
  return (
    <div className="fixed w-full bg-white dark:bg-[#0a0e16] z-10">
      <nav className="w-full h-[80px] md:h-[60px]  max-w-6xl mx-auto flex px-5 items-center justify-between md:justify-start space-x-10">
        <div className="flex items-center space-x-3">
          <img src={logo.src} alt="logo" className="h-12 w-12" />
          <h1 className="text-black dark:text-white text-lg font-bold min-w-fit">
            MyLasted
          </h1>
        </div>
        <div className=" md:hidden">
          {!isOpen && (
            <MdMenu
              size={30}
              className="text-black dark:text-white"
              onClick={toggle}
            />
          )}
          {isOpen && (
            <MdClose
              size={30}
              className="text-black dark:text-white"
              onClick={toggle}
            />
          )}
          <div
            className={
              !isOpen
                ? 'fixed left-[-100%] ease-in-out duration-1000 md:hidden'
                : 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white  dark:bg-[#0a0e16] ease-in-out duration-500 md:hidden'
            }
          >
            <div>
              <div className="flex items-center space-x-3 p-4">
                <img src={logo.src} alt="logo" className="h-12 w-12" />
                <h1 className="text-black dark:text-white text-lg font-bold min-w-fit">
                  MyLasted
                </h1>
              </div>
              <ul className="flex flex-col h-full">
                <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
                  <a href="/">Updates</a>
                </li>
                <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
                  <a href="#">Chapters</a>
                </li>
                <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
                  <a href="#">Donations</a>
                </li>
                <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
                  <a href="https://discord.gg/9zj7tmQqD8" target="_blank">
                    Discord
                  </a>
                </li>
              </ul>
              <ul className="flex flex-col h-full">
                <li
                  className="p-4 flex items-center space-x-2"
                  onClick={() => {
                    toggleDark()
                    toggleTheme(isDark)
                  }}
                >
                  {isDark ? (
                    <BsFillSunFill size={20} color="white" />
                  ) : (
                    <BsFillMoonFill size={20} />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden md:flex font-semibold w-full justify-between">
          <ul className="hidden md:flex h-full">
            <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
              <a href="/">Updates</a>
            </li>
            <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
              <a href="#">Chapters</a>
            </li>
            <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
              <a href="#">Donations</a>
            </li>
            <li className="p-4 text-black dark:text-white hover:scale-110 ease-in-out duration-500 ">
              <a href="https://discord.gg/9zj7tmQqD8" target="_blank">
                Discord
              </a>
            </li>
          </ul>
          <ul className="flex items-center justify-center h-full space-x-3  ">
            <li
              className="p-4 flex items-center space-x-2"
              onClick={() => {
                toggleDark()
                toggleTheme(isDark)
              }}
            >
              {isDark ? (
                <BsFillSunFill size={20} color="white" />
              ) : (
                <BsFillMoonFill size={20} />
              )}
            </li>

            {session && (
              <>
                <li>
                  <button
                    className=" text-base border py-2 px-3 rounded-full dark:text-white text-black"
                    onClick={() => {
                      signOut()
                    }}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    className=" text-base border py-2 px-3 rounded-full dark:text-white text-black"
                    onClick={() => {
                      router.push('/upload')
                    }}
                  >
                    Add Chapter
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
