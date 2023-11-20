import React from 'react'

const ChatSearch = () => {
  return (
    <div className="mb-3 p-8">
      <div className="relative  flex w-full flex-wrap items-stretch ">
        <input
          type="search"
          className="relative m-0 block w-[1px] text-sm bg-[#e6e6e6] py-2 pl-10  min-w-0 flex-auto rounded-lg  border-solid border-neutral-300 bg-transparent bg-clip-padding px-3  font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out "
          placeholder="Search or start new chat"
          aria-label="Search"
          aria-describedby="button-addon2" />

        
       <div className='absolute left-0 top-0.5'>
       <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-400 dark:text-neutral-200"
          id="basic-addon2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd" />
          </svg>
        </span>
       </div>
      </div>
    </div>
  )
}

export default ChatSearch