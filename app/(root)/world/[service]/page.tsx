import MusicList from '@/components/music/music-list'
import Playlist from '@/components/music/play-list'
import { fetchChartWorldData } from '@/lib/fetch'
import { getDayFormatted } from '@/lib/utils'
import React from 'react'

export async function generateMetadata(props: {
  params: Promise<{ service: string }>
}) {
  const params = await props.params

  return {
    title: `${params.service.toUpperCase()} 차트 Top 100`,
  }
}

export default async function WorldMusicPage(props: {
  params: Promise<{ service: string }>
  searchParams: Promise<{ date?: string; country?: string }>
}) {
  const params = await props.params
  const service = params.service
  const searchParams = await props.searchParams
  const date = searchParams.date || getDayFormatted()
  const country = searchParams.country || 'global'
  const chartData = await fetchChartWorldData(service, country, date)

  // console.log(params, service, searchParams, date, chartData)

  return (
    <section>
      <div className='flex gap-2'>
        <div className='flex-grow'>
          <MusicList chartData={chartData} />
        </div>
        <div className='w-[300px] sticky top-6 h-screen overflow-scroll'>
          <Playlist />
        </div>
      </div>
    </section>
  )
}
