'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { YouTubePlayer } from 'react-youtube'

export interface Song {
  youtubeId: string
  title: string
  artist: string
}

export type PlayerPosition = 'topLeft' | 'bottomLeft' | 'bottomRight'

interface MusicContextProps {
  playlist: Song[] // 재생 목록 (플레이리스트)
  currentSongIndex: number // 현재 재생 중인 노래의 인덱스
  currentSong?: Song // 현재 재생 중인 곡 정보
  addToTopList: (song: Song) => void // 노래를 플레이리스트 맨 위에 추가
  addToBottomList: (song: Song) => void // 노래를 플레이리스트 맨 아래에 추가
  nextSong: () => void // 다음 곡 재생
  prevSong: () => void // 이전 곡 재생
  setCurrentSongIndex: (index: number) => void // 특정 곡을 바로 재생
  isPlaying: boolean // 현재 재생 여부 (true = 재생 중, false = 정지)
  togglePlay: () => void // 플레이/정지 토글 기능
  setInstance: (player: YouTubePlayer) => void // YouTube 플레이어 인스턴스 저장
  removePlaylist: (index: number) => void // 재생 목록에서 특정 곡 삭제
  clearPlaylist: () => void // 재생목록 지우기
  playerSize: number // 유튜브 플레이어 크기 (0 ~ 4)
  setPlayerSize: (size: number) => void // 플레이어 크기 변경 함수
  isPlayerVisible: boolean // 플레이어 보임 여부
  togglePlayerVisibility: () => void // 플레이어 보이기/숨기기 기능
  playerPosition: PlayerPosition // 플레이어 위치 상태
  togglePlayerPosition: () => void // 플레이어 위치 변경 함수
  progress: number // 노래 진행 상황
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [instance, setInstance] = useState<YouTubePlayer | null>(null)
  const [playerSize, setPlayerSize] = useState<number>(1)
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [playerPosition, setPlayerPosition] =
    useState<PlayerPosition>('bottomRight')

  const currentSong =
    currentSongIndex >= 0 && currentSongIndex < playlist.length
      ? playlist[currentSongIndex]
      : undefined

  // 🎵 플레이리스트 맨 위에 곡 추가 후 재생
  const addToTopList = (song: Song) => {
    setPlaylist((prev) => [song, ...prev]) // 새 곡을 리스트 맨 위에 추가
    setCurrentSongIndex(0) // 추가한 곡을 바로 재생
  }

  // 🎵 플레이리스트 맨 아래에 곡 추가
  const addToBottomList = (song: Song) => {
    setPlaylist((prev) => [...prev, song]) // 새 곡을 리스트 맨 아래에 추가
    if (currentSongIndex === -1) {
      setCurrentSongIndex(0) // 현재 곡이 없다면 추가된 곡을 재생
    }
  }

  // ⏭ 다음 곡 재생
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      playlist.length === 0 ? -1 : (prevIndex + 1) % playlist.length
    )
  }

  // ⏮ 이전 곡 재생
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => {
      if (playlist.length === 0) return -1
      return (prevIndex - 1 + playlist.length) % playlist.length
    })
  }

  // 🔘 플레이/정지 토글 기능
  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev
      if (instance) {
        if (next) {
          instance.playVideo() // YouTube 플레이어 재생
        } else {
          instance.pauseVideo() // YouTube 플레이어 정지
        }
      }
      return next
    })
  }

  // 🗑 재생 목록에서 특정 곡 삭제
  const removePlaylist = (index: number) => {
    setPlaylist((prev) => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })

    // ⚠️ setPlaylist와 분리해서 처리해야 안전하게 동작함!
    setCurrentSongIndex((prev) => {
      if (index < prev) {
        return prev - 1
      } else if (index === prev) {
        return prev // 현재 곡을 지운 경우 (그대로 유지하거나 다른 처리 가능)
      } else {
        return prev
      }
    })
  }

  // 🎵 플레이리스트 전체 초기화
  const clearPlaylist = () => {
    setPlaylist([]) // 재생 목록 비우기
    setCurrentSongIndex(-1) // 재생 중인 곡 초기화
    setIsPlaying(false) // 재생 상태 false로 설정
    setProgress(0) // 진행 상황 초기화
    if (instance) {
      instance.stopVideo() // YouTube 영상 정지
    }
  }

  // 🔹 플레이어 보이기/숨기기 토글
  const togglePlayerVisibility = () => {
    setIsPlayerVisible((prev) => !prev)
  }

  // 🎯 위치 변경 (순환 방식)
  const togglePlayerPosition = () => {
    const positions: PlayerPosition[] = ['topLeft', 'bottomLeft', 'bottomRight']
    setPlayerPosition(
      (prev) => positions[(positions.indexOf(prev) + 1) % positions.length]
    )
  }

  // YouTube Player progress 업데이트
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (instance && isPlaying) {
      interval = setInterval(() => {
        const currentTime = instance.getCurrentTime()
        const duration = instance.getDuration()

        if (duration > 0) {
          const percent = (currentTime / duration) * 100
          setProgress(percent)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [instance, isPlaying])

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentSongIndex,
        currentSong,
        addToTopList,
        addToBottomList,
        nextSong,
        prevSong,
        togglePlay,
        removePlaylist,
        isPlaying,
        setInstance,
        setCurrentSongIndex,
        clearPlaylist,
        playerSize,
        setPlayerSize,
        isPlayerVisible,
        togglePlayerVisibility,
        playerPosition,
        togglePlayerPosition,
        progress,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
