'use client'

import { useMusic } from '@/context/music-context'
import { Trash, Disc3, Music } from 'lucide-react'
import React from 'react'

export default function YoutubePlaylist({
  show,
  onSelect,
}: {
  show: boolean
  onSelect: (index: number) => void
}) {
  const { playlist, currentSongIndex, removePlaylist } = useMusic()

  if (!show) return null

  return (
    <div className='youtube__list'>
      <div className='title'>
        <h2 className='mb-1 flex items-center gap-1'>
          <Music size={16} />
          Play List
        </h2>
      </div>
      <div className='h-screen overflow-y-auto w-full pb-[120px]'>
        <ul>
          {playlist.length === 0 ? (
            <li className='text-sm text-zinc-700'>
              재생 목록이 비어 있습니다.
            </li>
          ) : (
            playlist.map((song, index) => (
              <li
                key={`${song.youtubeId}-${index}`}
                onClick={() => onSelect(index)}
                className={`py-1 text-sm truncate relative group cursor-pointer hover:underline underline-offset-4 ${
                  index === currentSongIndex
                    ? 'text-orange-500'
                    : 'text-zinc-800'
                }`}
              >
                {index === currentSongIndex ? (
                  <Disc3
                    size={13}
                    className='inline-block mr-1 mt-[-2px] animate-spin'
                  />
                ) : (
                  <Disc3 size={13} className='inline-block mr-1 mt-[-2px]' />
                )}
                {song.title} - {song.artist}
                <span className='absolute top-0.5 right-0 border px-2 py-1 rounded-md bg-accent/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'>
                  <Trash
                    size={14}
                    className='text-zinc-800'
                    onClick={(e) => {
                      e.stopPropagation()
                      removePlaylist(index)
                    }}
                  />
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
