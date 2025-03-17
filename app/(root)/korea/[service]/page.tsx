import React from 'react'
import { getDayFormatted } from '@/lib/utils'
import { fetchChartKoreaData } from '@/lib/fetch'
import MusicList from '@/components/music/music-list'
import Playlist from '@/components/music/play-list'

export async function generateMetadata(props: {
  params: Promise<{ service: string }>
}) {
  const params = await props.params

  return {
    title: `${params.service.toUpperCase()} 차트 Top 100`,
  }
}

export default async function KoreaMusicPage(props: {
  params: Promise<{ service: string }>
  searchParams: Promise<{ date?: string }>
}) {
  const params = await props.params
  const service = params.service
  const searchParams = await props.searchParams
  const date = searchParams.date || getDayFormatted()
  const chartData = await fetchChartKoreaData(service, date)

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
