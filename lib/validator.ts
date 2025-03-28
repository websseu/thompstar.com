import { z } from 'zod'

// 회원 공통요소
const UserName = z
  .string()
  .min(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' })
  .max(15, { message: '사용자 이름은 최대 15자까지 가능합니다.' })
const Password = z
  .string()
  .min(5, { message: '비밀번호는 최소 5자 이상이어야 합니다.' })
  .max(30, { message: '비밀번호는 최대 30자까지 가능합니다.' })
const Email = z
  .string()
  .min(1, '이메일은 필수 입력 사항입니다.')
  .email('올바른 이메일 형식이 아닙니다.')

// 회원가입 입력
export const UserInputSchema = z.object({
  name: UserName,
  password: Password,
  email: Email,
  emailVerified: z.boolean(),
  verificationToken: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
  visitCount: z.number().int().default(0),
})

// 로그인
export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
})

// 회원가입
export const UserSignUpSchema = UserSignInSchema.extend({
  name: UserName,
  confirmPassword: Password,
  image: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '패스워드가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

// 이름 변경
export const UserNameSchema = z.object({
  name: UserName,
})

// 글쓰기 유효성 검사
export const PostInputSchema = z.object({
  title: z.string().min(3, '제목은 최소 3자 이상이어야 합니다.'),
  slug: z.string().min(3, '슬러그는 최소 3자 이상이어야 합니다.'),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  components: z.string().optional(),
  description: z.string().optional(),
  contents: z.string().optional(),
  isPublished: z.boolean().default(false),
  author: z.string().optional(),
  images: z.string().optional(),
  youtubeId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  reviews: z.array(z.string()).default([]),
  numReviews: z.number().optional(),
  numViews: z.number().optional(),
  numLikes: z.number().optional(),
})

// 글쓰기 업데이트
export const PostUpdateSchema = PostInputSchema.extend({
  _id: z.string(),
})
