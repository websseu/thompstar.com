import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 슬러그
export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')

// 날짜 표시
export function formatDate(date: string | Date): string {
  if (!date) return '-' // 날짜가 없을 경우 예외 처리
  const parsedDate = date instanceof Date ? date : new Date(date) // Date 변환

  const formattedDate = parsedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return formattedDate.replace(/\.$/, '') // 마지막 점 제거
}

export const formatDate2 = (date: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

// 날짜 표시(2000-02-02) 하루전
export function getFormattedDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate() - 1).padStart(2, '0')
  return `${year}-${month}-${day}`
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

// 카드 시간 표시 방법
export const formatTimeAgo = (date: string | Date): string => {
  const inputDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - inputDate.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays}일 전`
  }
  if (diffHours > 0) {
    return `${diffHours}시간 전`
  }
  return '방금 전'
}

// 하트 갯수 표시
export const formatLikes = (numLikes?: number) => {
  if (!numLikes || numLikes === 0) return null
  return numLikes
}

// 글 페이지 날짜
export function formatPostDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  return (
    new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date) + '에 발행되었습니다.'
  )
}
