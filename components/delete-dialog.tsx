'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function DeleteDialog({
  id,
  action,
  callbackAction,
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
  callbackAction?: () => void
}) {
  const [open, setOpen] = useState(false) // 다이얼로그의 열림/닫힘 상태 관리
  const [isPending, startTransition] = useTransition() // 비동기 상태 관리
  const { toast } = useToast()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='outline' className='ml-1'>
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 행동은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-xs'>취소</AlertDialogCancel>

          <Button
            variant='destructive'
            size='sm'
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const res = await action(id)
                if (!res.success) {
                  toast({
                    variant: 'destructive',
                    description: res.message,
                  })
                } else {
                  setOpen(false)
                  toast({
                    description: res.message,
                  })
                  if (callbackAction) callbackAction()
                }
              })
            }
          >
            {isPending ? '삭제중...' : '삭제'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
