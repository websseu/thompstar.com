'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { SiYoutubemusic } from 'react-icons/si'
import { CirclePlus, CirclePlay } from 'lucide-react'

interface MusicItemProps {
  ranking: string
  image: string
  title: string
  artist: string
  appleID?: string
  youtubeID?: string
  spotifyID?: string
}

export default function MusicItem({
  ranking,
  image,
  title,
  artist,
  youtubeID,
}: MusicItemProps) {
  return (
    <li className='music__item group'>
      <div className='ranking'>{ranking}</div>
      <div className='image relative'>
        <Image src={image} width={50} height={50} alt={title} />
      </div>
      <div className='title'>
        <p>{title}</p>
        <p>{artist}</p>
      </div>
      <div className='listen'>
        {youtubeID && (
          <>
            <Button
              variant='play'
              size='play'
              className='text-red-500'
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${youtubeID}`,
                  '_blank'
                )
              }
            >
              <SiYoutubemusic size={14} />
            </Button>
            <Button variant='play' size='play'>
              <CirclePlay />
            </Button>
            <Button variant='play' size='play'>
              <CirclePlus size={14} />
            </Button>
          </>
        )}
      </div>
    </li>
  )
}
