import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
    // return 'Something went wrong. please try again'
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}
