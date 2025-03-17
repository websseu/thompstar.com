import React from 'react'
import MusicItem from './music-item'

interface MusicItemProps {
  ranking: string
  image: string
  title: string
  artist: string
  appleID?: string
  youtubeID?: string
  spotifyID?: string
}

interface MusicListProps {
  chartData: MusicItemProps[]
}

export default function MusicList({ chartData }: MusicListProps) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className='border-b text-center py-32 text-sm text-zinc-600'>
        해당 날짜에는 뮤직 데이터가 없습니다. 😂
        <br />
        다른 날짜를 선택해주세요!
      </div>
    )
  }
  return (
    <div className='music__list'>
      <ul>
        {chartData.map((item, index) => (
          <MusicItem key={index} {...item} />
        ))}
      </ul>
    </div>
  )
}
