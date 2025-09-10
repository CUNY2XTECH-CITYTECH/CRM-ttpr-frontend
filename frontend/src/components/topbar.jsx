import React, { useState } from 'react'
import { Button } from './ui/button'
import { Rows3, LayoutGrid, ArrowLeft, ChevronLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
export const Topbar = ({ title, view = null, creatable = true, setView = null, mode, link = null }) => {

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
        <div onClick={routeBack} className='hover:bg-accent flex items-center w-fit pl-1 pr-2 py-0 cursor-pointer border-secondary border rounded-sm '>
          <ChevronLeft className='w-5 h-5' />
          <span className='text-xs'>Back</span>
        </div>
        <h4 className='py-2 font-semibold uppercase'>{title}</h4>
      </div>
      {mode === 'read' ?
        <div className='border-t border-gray-200 py-4 flex gap-1 justify-between'>
          {creatable ?
            <Button><Link to={link}>Create new</Link></Button>
            : <div></div>
          }
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
