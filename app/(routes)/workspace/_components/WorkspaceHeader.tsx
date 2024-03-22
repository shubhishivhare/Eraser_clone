import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({onSave}:any) {
  return (
    <div className='p-3 border-b flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
        <Image src={'/logo-1.png'} alt='logo'
        height={40}
        width={40}
        />
        <h2>File Name</h2>
        </div>

        <div className='flex items-center gap-4'>
        <Button className='h-8 text-[12px] gap-2 bg-white hover:bg-slate-100 border text-black'
        onClick={()=>onSave()}>
          Save 
          <Save className='h-3 w-3'/>
        </Button>
        <Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>
          Share 
          <Link className='h-3 w-3'/>
        </Button>
        
        </div>
    </div>
  )
}

export default WorkspaceHeader