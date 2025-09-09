import React, { useState } from 'react'
import { Button } from './ui/button'
import { Rows3, LayoutGrid, ArrowLeft, ChevronLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import Papa from 'papaparse'
import { useClient } from '@/lib/dataContext'
export const Topbar = ({ title, view = null, creatable = true, setView = null, mode, link = null }) => {
  const [dataset, setDataset] = useState(null)
  const navigate = useNavigate()
  const { client } = useClient()
  const changeView = () => {
    setView(!view)
  }
  const routeBack = () => {
    navigate(-1)
  }
  const uploadCSV = async (e) => {

    const type = title.split(' ')[2].toLowerCase().trim()
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function(results) {
        switch (type) {
          case 'company':
            const tryUpload = await client.companies.createMany({ data: results.data})
            console.log(tryUpload,results.data,'tryupload')
            break;
          default:
            break;
        }

      },
      error: function(error) {
        console.log(error, 'error')
      }
    })
    await result.then(async (res) => {
    })
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
            <div className='flex gap-2'>
              <Button><Link to={link}>Create new</Link></Button>
              <Button className={'relative'}>
                Upload CSV
                <Input type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' onChange={uploadCSV} />
              </Button>
            </div>
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
