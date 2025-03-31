'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDayFormatted, getDayFormattedWeekday } from '@/lib/utils'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CalendarDays } from 'lucide-react'
import { Button } from '../ui/button'

export default function CalendarKorea({
  date,
  service,
}: {
  date: string
  service: string
}) {
  const router = useRouter()
  const [selected, setSelected] = useState<Date | undefined>(new Date(date))
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  const updateDate = (newDate: Date) => {
    const formatted = getDayFormatted(newDate)
    setSelected(newDate)
    router.push(`/korea/${service}?date=${formatted}`)
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
          <CalendarDays className='w-3 h-3 text-gray-600' />
          <span>{getDayFormattedWeekday(selected)}</span>
        </Button>
        <Button variant='outline' size='cal' onClick={handlePrevWeek}>
          이전 주
        </Button>
        <Button variant='outline' size='cal' onClick={handleToday}>
          오늘
        </Button>
        <Button variant='outline' size='cal' onClick={handleNextWeek}>
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
