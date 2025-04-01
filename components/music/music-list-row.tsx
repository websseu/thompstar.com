'use client'

import React from 'react'
import Image from 'next/image'
import { MusicData, MusicItem } from '@/lib/types'
import { useMusic } from '@/context/music-context'

export default function MusicListRow({ koreaData }: { koreaData: MusicData }) {
  const { addToTopList, currentSong } = useMusic()

  const handleAddToTopList = (item: MusicItem) => {
    if (!item.youtubeID) return
    addToTopList({
      youtubeId: item.youtubeID,
      title: item.title,
      artist: item.artist,
    })
  }

  return (
    <div>
      {Object.entries(koreaData).map(([platform, songs]) => {
        const top15 = songs.slice(0, 15)

        const grouped = Array.from({ length: 3 }, (_, i) =>
          top15.slice(i * 5, i * 5 + 5)
        )

        return (
          <div key={platform} className='music__box'>
            <div className='title'>
              <h2>{platform} Top100</h2>
            </div>
            <div className='content'>
              {grouped.map((group, groupIdx) => (
                <ul key={groupIdx}>
                  {group.map((item, index) => {
                    const isCurrent = currentSong?.youtubeId === item.youtubeID

                    return (
                      <li
                        key={index}
                        className={`music__list group ${
                          isCurrent ? 'bg-red-50' : ''
                        }`}
                        onClick={() => handleAddToTopList(item)}
                      >
                        <div className='ranking'>
                          {groupIdx * 5 + index + 1}
                        </div>
                        <div className='image'>
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt={item.title}
                          />
                        </div>
                        <div className='title'>
                          <p>{item.title}</p>
                          <p>{item.artist}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
