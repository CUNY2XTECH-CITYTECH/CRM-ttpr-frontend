import React, { useState } from 'react'
import { Button } from './ui/button'

import {  Rows3, LayoutGrid, ArrowLeft } from 'lucide-react'
export const Topbar = ({ title, view, setView, mode }) => {
  const changeView = () => {
    setView(!view)
  }
  return (
    <div className='grid gap-1 '>
      <div className='flex gap-3'>
      <div className='hover:bg-accent flex gap-1 items-center w-fit px-2 py-1 cursor-pointer border-gray-200  border rounded-sm '>
        <ArrowLeft className='w-5 h-5'/>
        <span className='text-sm'>Back</span>
      </div>
      <h4 className='py-2 font-semibold uppercase'>{title}</h4>
      </div>
      {mode === 'read' ?
        <div className='border-t border-gray-200 py-4 flex gap-1 justify-between'>
          <Button>Create new</Button>
          <div className='flex p-1 gap-1 border border-gray-200 rounded-lg'>
            <Button onClick={changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
              <LayoutGrid />
            </Button>

            <Button onClick={changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
              <Rows3 />
            </Button>
          </div>
        </div>
        : mode === 'create' ?
          <div className='flex justify-items-end'>
            <Button className={'ml-auto'}>Save</Button>
          </div>
          : <></>}
    </div>
  )
}
