import React from 'react'
import { getDayFormatted } from '@/lib/utils'
import { fetchWorldData } from '@/hook/fetch'
import MusicListCol from '@/components/music/music-list-col'
import Calendar from '@/components/music/calendar'
import CountryList from '@/components/music/country-list'
import PlayListAdd from '@/components/music/playList-add'

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
  const chartData = await fetchWorldData(service, country, date)

  return (
    <section>
      <CountryList service={service} />
      <div className='flex gap-1'>
        <Calendar
          date={date}
          service={service}
          country={country}
          basePath='/world'
        />
        <PlayListAdd chartData={chartData} />
      </div>
      <MusicListCol chartData={chartData} />
    </section>
  )
}
