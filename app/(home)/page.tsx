import React from 'react'
import { getDayFormatted } from '@/lib/utils'
import { fetchMainKoreaData, fetchMainYoutubeData } from '@/hook/fetch'
import MusicListRow from '@/components/music/music-list-row'

export default async function HomePage() {
  const today = getDayFormatted()
  const koreaData = await fetchMainKoreaData(today)
  const youtubeData = await fetchMainYoutubeData(today)

  const isKoreaEmpty =
    !koreaData || (Array.isArray(koreaData) && koreaData.length === 0)
  const isYoutubeEmpty =
    !youtubeData || (Array.isArray(youtubeData) && youtubeData.length === 0)

  if (isKoreaEmpty || isYoutubeEmpty) {
    return (
      <p className='text-center text-red-500'>
        ❌ 데이터를 불러올 수 없습니다.
      </p>
    )
  }

  return (
    <section>
      <MusicListRow koreaData={koreaData} />
    </section>
  )
}
