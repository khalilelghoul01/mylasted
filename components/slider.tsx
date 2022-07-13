import React, { useEffect } from 'react'

function Slider({ onChange }: { onChange: (value: number) => void }) {
  const getLocalStorage = () => {
    let item = null
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      item = localStorage.getItem('fontSize')
    }
    if (item) {
      onChange(parseInt(item))
      return parseInt(item)
    }
    return 30
  }

  const setLocalStorage = (value: number) => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorage.setItem('fontSize', value.toString())
    }
  }
  const [value, setValue] = useState(10)
  useEffect(() => {
    setValue(getLocalStorage())
  }, [])
  return (
    <div className="p-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Font: {value}px
        <input
          type="range"
          min={10}
          step={1}
          max={30}
          value={value}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={(e) => {
            onChange(parseInt(e.target.value))
            setValue(parseInt(e.target.value))
            setLocalStorage(parseInt(e.target.value))
          }}
        />
      </label>
    </div>
  )
}

export default Slider
