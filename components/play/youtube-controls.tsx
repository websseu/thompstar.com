'use client'

import React, { useEffect } from 'react'
import { useMusic } from '@/context/music-context'
import { LuListMusic } from 'react-icons/lu'
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
} from 'react-icons/tb'

interface YoutubePlayerControlsProps {
  showList: boolean
  toggleList: () => void
}

export default function YoutubePlayerControls({
  showList,
  toggleList,
}: YoutubePlayerControlsProps) {
  const { prevSong, nextSong, togglePlay, isPlaying, progress } = useMusic()

  // ✅ showList 상태 변화에 따라 body 스크롤 제어
  useEffect(() => {
    if (showList) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [showList])

  return (
    <div className='player__controls'>
      <div className='bar'>
        <span className='progress' style={{ width: `${progress}%` }}></span>
      </div>
      <div className='left'></div>
      <div className='center'>
        <button onClick={prevSong}>
          <TbPlayerSkipBackFilled size={20} />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? (
            <TbPlayerPauseFilled size={26} />
          ) : (
            <TbPlayerPlayFilled size={26} />
          )}
        </button>
        <button onClick={nextSong}>
          <TbPlayerSkipForwardFilled size={20} />
        </button>
      </div>
      <div className='right'>
        <button onClick={toggleList}>
          <LuListMusic size={20} />
        </button>
      </div>
    </div>
  )
}
