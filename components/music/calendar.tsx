'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDayFormatted, getDayFormattedWeekday } from '@/lib/utils'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CalendarDays } from 'lucide-react'
import { Button } from '../ui/button'

interface CalendarProps {
  date: string
  service: string
  country?: string
  basePath: string
}

export default function Calendar({
  date,
  service,
  country,
  basePath,
}: CalendarProps) {
  const router = useRouter()
  const [selected, setSelected] = useState<Date | undefined>(new Date(date))
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  // 국가 변경 시 날짜 초기화 (오늘 날짜)
  useEffect(() => {
    setSelected(new Date()) // 날짜를 오늘로 초기화
  }, [country])

  const updateDate = (newDate: Date) => {
    const formatted = getDayFormatted(newDate)
    setSelected(newDate)

    // 국가가 있는 경우와 없는 경우를 분리
    const url = country
      ? `${basePath}/${service}?date=${formatted}&country=${country}`
      : `${basePath}/${service}?date=${formatted}`

    router.push(url)
  }

  const handleSelect = (day: Date | undefined) => {
    if (!day) return
    setIsCalendarVisible(false)
    updateDate(day)
  }

  const handleToday = () => {
    updateDate(new Date())
  }

  const handlePrevWeek = () => {
    if (!selected) return
    const prev = new Date(selected)
    prev.setDate(prev.getDate() - 7)
    updateDate(prev)
  }

  const handleNextWeek = () => {
    if (!selected) return
    const next = new Date(selected)
    next.setDate(next.getDate() + 7)
    updateDate(next)
  }

  return (
    <div className='mb-2 relative'>
      <div className='flex gap-1'>
        <Button
          variant='outline'
          size='cal'
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          className='flex items-center gap-2'
        >
          <CalendarDays className='w-4 h-4 text-gray-600' />
          <span>{getDayFormattedWeekday(selected)}</span>
        </Button>
        <Button
          variant='outline'
          size='cal'
          className='text-xs'
          onClick={handlePrevWeek}
        >
          이전 주
        </Button>
        <Button
          variant='outline'
          size='cal'
          className='text-xs'
          onClick={handleToday}
        >
          오늘
        </Button>
        <Button
          variant='outline'
          size='cal'
          className='text-xs'
          onClick={handleNextWeek}
        >
          다음 주
        </Button>
      </div>

      {isCalendarVisible && (
        <div className='calendar p-5'>
          <DayPicker
            mode='single'
            selected={selected}
            onSelect={handleSelect}
            weekStartsOn={0}
            modifiersClassNames={{
              selected: 'bg-blue-500 text-white rounded-full',
              today: 'text-orange-500 font-bold',
            }}
          />
        </div>
      )}
    </div>
  )
}
