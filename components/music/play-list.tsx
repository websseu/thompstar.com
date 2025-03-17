'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Piano, SkipForward, SkipBack, Play } from 'lucide-react'

export default function Playlist() {
  return (
    <div className='px-2 py-4 border-t border-b'>
      <div className='mb-2 flex items-center gap-2 '>
        <h2 className='flex gap-2 items-center'>
          <Piano size={14} />
          Play List
        </h2>
        <div className='ml-auto flex bg-accent rounded-2xl gap-2 px-4'>
          <Button variant='ghost' size='sm' aria-label='이전곡'>
            <SkipBack size={14} />
          </Button>
          <Button variant='ghost' size='sm' aria-label='플레이/정지'>
            <Play size={13} />
          </Button>
          <Button variant='ghost' size='sm' aria-label='다음곡'>
            <SkipForward size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
