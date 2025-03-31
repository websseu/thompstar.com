'use client'

import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { useMusic } from '@/context/music-context'

interface YoutubePlayerPositionProps {
  showList: boolean
  playerSize: {
    width: number
    height: number
    top: number
  }
  opts: YouTubeProps['opts']
}

export default function YoutubePlayerPosition({
  showList,
  playerSize,
  opts,
}: YoutubePlayerPositionProps) {
  const { currentSong, nextSong, setInstance } = useMusic()

  if (!currentSong) return null

  return (
    <div
      className={`player__position ${
        showList ? 'bottom-auto h-screen top-0 z-40' : 'bottom-0 z-50'
      }`}
      style={{
        width: showList ? 'calc(100vw - 300px)' : 106,
      }}
    >
      <div
        className='view relative'
        style={{
          top: `${showList ? playerSize.top : 0}px`,
        }}
      >
        <YouTube
          key={currentSong.youtubeId}
          videoId={currentSong.youtubeId}
          opts={opts}
          onReady={(event) => setInstance(event.target)}
          onEnd={nextSong}
        />
      </div>
    </div>
  )
}
