import React, { useState } from 'react'
import { Button } from './ui/button'
import { Rows3, LayoutGrid, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const Topbar = ({ title, view=null, setView=null, mode }) => {

  const navigate = useNavigate()
  const changeView = () => {
    setView(!view)
  }
  const routeBack = () => {
    navigate(-1)
  }

  return (
    <div className='grid gap-1 '>
      <div className='flex gap-10'>
        <div onClick={routeBack} className='hover:bg-accent flex gap-1 items-center w-fit px-2 py-1 cursor-pointer border-gray-200  border rounded-sm '>
          <ArrowLeft className='w-5 h-5' />
          <span className='text-xs'>Back</span>
        </div>
        <h4 className='py-2 font-semibold uppercase'>{title}</h4>
      </div>
      {mode === 'read' ?
        <div className='border-t border-gray-200 py-4 flex gap-1 justify-between'>
          <Button>Create new</Button>
          <div className='flex p-1 gap-1 border border-gray-200 rounded-lg'>
            <Button onClick={changeView && changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
              <LayoutGrid />
            </Button>

            <Button onClick={changeView && changeView} variant={'secondary'} className={'border border-transparent hover:border-gray-300 cursor-pointer'}>
              <Rows3 />
            </Button>
          </div>

        </div>
        :
        <></>}
    </div>
  )
}
