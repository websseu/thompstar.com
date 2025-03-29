import Image from 'next/image'
import React from 'react'
import { ChartItem } from '@/lib/types'
import { Button } from '../ui/button'
import { SiYoutubemusic } from 'react-icons/si'
import { CirclePlus } from 'lucide-react'
import { FaPlay } from 'react-icons/fa'

export default function MusicListCol({
  chartData,
}: {
  chartData: ChartItem[]
}) {
  return (
    <div className='music__box col'>
      <div className='content'>
        {chartData.map((item) => (
          <div key={item.ranking} className='music__list group'>
            <div className='ranking'>{item.ranking}</div>
            <div className='image'>
              <Image src={item.image} width={50} height={50} alt={item.title} />
              <div className='bg group-hover:opacity-100' />
              <FaPlay className='group-hover:opacity-100' />
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
                  >
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-red-500'
                    >
                      <SiYoutubemusic size={14} />
                    </Button>
                  </a>
                  <Button variant='outline' size='sm'>
                    <CirclePlus />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
