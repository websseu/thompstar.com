'use client'

import Link from 'next/link'
import data from '@/lib/data'
import { useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Country {
  name: string
  nameKorean: string
  icon: string
  url?: string
}

interface CountryListProps {
  service: string
}

export default function CountryList({ service }: CountryListProps) {
  let countryData: Country[] = []

  if (service === 'youtube') {
    countryData = data.youtubeCountry
  } else if (service === 'apple') {
    countryData = data.applyCountry
  } else if (service === 'spotify') {
    countryData = data.spotifyCountry
  }

  const [showAll, setShowAll] = useState(false)
  const searchParams = useSearchParams()
  const selectedCountry = searchParams.get('country') || 'global' // 기본값: 글로벌

  // 처음에는 글로벌만 보이게 설정
  const visibleCountries = showAll ? countryData : [countryData[0]]

  return (
    <div className='flex flex-wrap gap-1 mb-2 overflow-x-auto items-center'>
      {visibleCountries.map((country) => (
        <Link
          key={country.name}
          href={`/world/${service}?country=${country.name}`}
        >
          <div
            className={`flex text-xs items-center gap-1 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer ${
              selectedCountry === country.name
                ? 'bg-orange-400 border-orange-400 text-white hover:bg-orange-400'
                : ''
            }`}
          >
            <span>{country.icon}</span>
            <span>{country.nameKorean}</span>
          </div>
        </Link>
      ))}

      {/* 더보기 / 접기 아이콘 버튼 */}
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className='flex items-center px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer'
      >
        {showAll ? (
          <MinusCircle size={16} className='text-gray-600' />
        ) : (
          <PlusCircle size={16} className='text-gray-600' />
        )}
      </button>
    </div>
  )
}
