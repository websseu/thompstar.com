'use client'

import React from 'react'
import Image from 'next/image'
import { MusicData, MusicItem } from '@/lib/types'
import { useMusic } from '@/context/music-context'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'

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
              <h2>{platform}</h2>
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
                          <span className={item.youtubeID ? '' : 'opacity-30'}>
                            {groupIdx * 5 + index + 1}
                          </span>
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
            <Link className='more' href={`/korea/${platform}`}>
              <CirclePlus size={18} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
