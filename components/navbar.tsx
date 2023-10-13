"use client"

import { UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <div className='fixed w-full py-3 z-50 flex justify-between items-center px-10 md:px-20 border-b bg-blue-400'>
      <span className='text-2xl text-white'>Y-Trello</span>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}