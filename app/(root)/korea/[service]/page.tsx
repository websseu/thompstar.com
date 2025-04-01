import React from 'react'
import { getDayFormatted } from '@/lib/utils'
import { fetchKoreaData } from '@/hook/fetch'
import MusicListCol from '@/components/music/music-list-col'
import Calendar from '@/components/music/calendar'
import PlayListAdd from '@/components/music/playList-add'

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
  const chartData = await fetchKoreaData(service, date)

  return (
    <section>
      <div className='flex gap-1'>
        <Calendar date={date} service={service} basePath='/korea' />
        <PlayListAdd chartData={chartData} />
      </div>
      <MusicListCol chartData={chartData} />
    </section>
  )
}
