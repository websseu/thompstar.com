'use client'

import { useEffect } from 'react'
import { useMusic } from '@/context/music-context'

export default function Shortcuts() {
  const { nextSong, prevSong, togglePlay } = useMusic()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // console.log('Pressed key:', e.key)

      if (e.key === ' ') {
        e.preventDefault() // 기본 스크롤 방지
        togglePlay() // 🔥 플레이/정지 토글 실행
      } else if (e.key === 'ArrowLeft') {
        prevSong() // ⏮ 이전 곡
      } else if (e.key === 'ArrowRight') {
        nextSong() // ⏭ 다음 곡
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSong, prevSong, togglePlay])

  return null
}
