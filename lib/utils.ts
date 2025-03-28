import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 "YYYY-MM-DD"
export function getDayFormatted(date: Date = new Date()): string {
  const previousDay = new Date(date)
  previousDay.setDate(date.getDate() - 1)

  const year = previousDay.getFullYear()
  const month = String(previousDay.getMonth() + 1).padStart(2, '0')
  const day = String(previousDay.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 날짜 "YYYY년 M월 D일(요일)"
export function getFormattedDateWithWeekday(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }
  return new Intl.DateTimeFormat('ko-KR', options).format(date)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return `${error.errors[field].path}: ${errorMessage}` // field: errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.name === 'ValidationError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0]
    return `${duplicateField} already exists`
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}
