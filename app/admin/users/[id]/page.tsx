import { getUserById } from '@/lib/actions/user.actions'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import UserEditForm from './user-edit-form'

export const metadata: Metadata = {
  title: '사용자 수정',
}

export default async function UserEditPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const { id } = params

  const user = await getUserById(id)
  if (!user) notFound()
  return (
    <main className='max-w-6xl mx-auto p-4'>
      <div className='flex mb-4'>
        <Link href='/admin/users'>Users</Link>
        <span className='mx-1'>›</span>
        <Link href={`/admin/users/${user._id}`}>{user._id}</Link>
      </div>

      <div className='my-8'>
        <UserEditForm user={user} />
      </div>
    </main>
  )
}
