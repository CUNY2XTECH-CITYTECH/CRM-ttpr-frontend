import React, { useState } from 'react'
import { Button } from './ui/button'

import { Rows3, LayoutGrid } from 'lucide-react'
export const Topbar = ({ title,view,setView }) => {
  const changeView=()=>{
     setView(!view)
  }
  return (
    <div className='grid gap-1 '>
      <h4 className='py-2 font-semibold uppercase'>{title}</h4>
      <div className='border-t border-gray-200 py-4 flex gap-1 justify-between'>
        <Button>Create new</Button>
        <div className='flex p-1 gap-1 border border-gray-200 rounded-lg'>
          <Button onclick={changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
            <LayoutGrid />
          </Button>
    
          <Button onclick={changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
            <Rows3 />
          </Button>
        </div>
      </div>
    </div>
  )
}
