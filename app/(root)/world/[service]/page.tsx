import React from 'react'
import { getDayFormatted } from '@/lib/utils'
import { fetchWorldData } from '@/hook/fetch'
import MusicListCol from '@/components/music/music-list-col'

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
      <MusicListCol chartData={chartData} />
    </section>
  )
}
