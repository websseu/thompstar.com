import { z } from 'zod'
import {
  PostInputSchema,
  PostUpdateSchema,
  UserInputSchema,
  UserNameSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from './validator'

// 메인 메뉴
export type MenuItem = {
  title: string
  ko: string
  href: string
  description: string
  url: string
}

export type worldItem = {
  title: string
  href: string
  description: string
}

export type countryItem = {
  name: string
  nameKorean: string
  icon: string
  url: string
}

// 전체 데이터 타입
export type Data = {
  koreaMenu: MenuItem[]
  worldMenu: worldItem[]
  youtubeCountry: countryItem[]
  applyCountry: countryItem[]
  spotifyCountry: countryItem[]
}

// 회원가입 및 로그인
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>

// 글 목록
export type IPostInput = z.infer<typeof PostInputSchema>
export type IPostUpdate = z.infer<typeof PostUpdateSchema>
