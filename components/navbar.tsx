"use client"

import { UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <div className='fixed w-full py-3 z-50 flex justify-between items-center container mx-auto border-b bg-blue-400'>
      <span className='text-2xl text-white'>Y-Trello</span>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}