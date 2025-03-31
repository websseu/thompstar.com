'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useMusic } from '@/context/music-context'
import YoutubePlaylist from './youtube-list'
import YoutubePlayerPosition from './youtube-position'
import YoutubePlayerControls from './youtube-controls'

export default function YoutubePlayer() {
  const { currentSong, setCurrentSongIndex } = useMusic()
  const [showList, setShowList] = useState(false)
  const [playerSize, setPlayerSize] = useState({ width: 0, height: 0, top: 0 })

  useEffect(() => {
    const calculateSize = () => {
      const fullWidth = window.innerWidth
      const fullHeight = window.innerHeight
      const width = fullWidth - 300
      const height = Math.floor((width * 9) / 16)
      const top = Math.max((fullHeight - height - 60) / 2, 0)
      setPlayerSize({ width, height, top })
    }

    calculateSize()
    window.addEventListener('resize', calculateSize)
    return () => window.removeEventListener('resize', calculateSize)
  }, [])

  const opts = useMemo(() => {
    if (!showList) {
      return {
        width: 106,
        height: 60,
        playerVars: {
          autoplay: 1,
        },
      }
    } else {
      return {
        width: playerSize.width,
        height: playerSize.height,
        playerVars: {
          autoplay: 1,
        },
      }
    }
  }, [showList, playerSize])

  if (!currentSong) return null

  return (
    <>
      {/* 재생 목록 */}
      <YoutubePlaylist show={showList} onSelect={setCurrentSongIndex} />

      {/* 유튜브 영상 위치 */}
      <YoutubePlayerPosition
        showList={showList}
        playerSize={playerSize}
        opts={opts}
      />

      {/* 뮤직 플레이어 컨트롤 */}
      <YoutubePlayerControls
        showList={showList}
        toggleList={() => setShowList((prev) => !prev)}
      />
    </>
  )
}
