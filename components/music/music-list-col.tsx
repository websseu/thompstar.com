'use client'

import React from 'react'
import Image from 'next/image'
import { ChartItem } from '@/lib/types'
import { Button } from '../ui/button'
import { SiYoutubemusic } from 'react-icons/si'
import { CirclePlus } from 'lucide-react'
import { FaPlay } from 'react-icons/fa'
import { useMusic } from '@/context/music-context'
import { toast } from 'sonner'

export default function MusicListCol({
  chartData,
}: {
  chartData: ChartItem[]
}) {
  const { addToTopList, addToBottomList, currentSong } = useMusic()

  const handleAddToTopList = (item: ChartItem) => {
    if (!item.youtubeID) return
    addToTopList({
      youtubeId: item.youtubeID,
      title: item.title,
      artist: item.artist,
    })
  }
  const handleAddToBottomList = (item: ChartItem) => {
    if (!item.youtubeID) return
    addToBottomList({
      youtubeId: item.youtubeID,
      title: item.title,
      artist: item.artist,
    })

    toast('🥰 재생목록에 추가되었습니다.')
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className='text-center border-t pt-44 text-sm text-zinc-600'>
        해당 날짜에는 뮤직 데이터가 없습니다. 😂
        <br />
        다른 날짜를 선택해주세요!
      </div>
    )
  }

  return (
    <div className='music__box col'>
      <div className='content'>
        {chartData.map((item) => {
          const isCurrent =
            !!item.youtubeID &&
            !!currentSong?.youtubeId &&
            currentSong.youtubeId === item.youtubeID

          return (
            <div
              key={`${item.title}-${item.artist}`}
              className={`music__list group ${isCurrent ? 'bg-red-50' : ''}`}
              onClick={() => handleAddToTopList(item)}
            >
              <div className='ranking'>{item.ranking}</div>
              <div className='image'>
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.title}
                />

                {item.youtubeID && (
                  <>
                    <div
                      className={`bg bg-black/60 ${
                        isCurrent
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                    <FaPlay
                      className={` ${
                        isCurrent
                          ? 'opacity-100 text-red-500'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </>
                )}
              </div>
              <div className='title'>
                <p>{item.title}</p>
                <p>{item.artist}</p>
              </div>
              <div className='listen'>
                {item.youtubeID && (
                  <>
                    <a
                      href={`https://www.youtube.com/watch?v=${item.youtubeID}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-red-500'
                      >
                        <SiYoutubemusic size={14} />
                      </Button>
                    </a>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToBottomList(item)
                      }}
                      className='hover:text-red-500'
                    >
                      <CirclePlus />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
